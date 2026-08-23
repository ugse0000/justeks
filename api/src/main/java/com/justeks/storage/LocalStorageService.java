package com.justeks.storage;

import com.justeks.common.InvalidUploadException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Phase 1 storage: files on local disk.
 *
 * Nothing the sender chose ends up in a path. The stored name is a UUID plus a
 * validated extension, so a filename like "../../etc/passwd" or one carrying a
 * control character cannot steer the write. Keys are re-checked on read and
 * delete too, because a key reaching those methods has been round the database
 * and back.
 */
@Service
public class LocalStorageService implements StorageService {

    private static final Logger log = LoggerFactory.getLogger(LocalStorageService.class);

    private final Path root;

    public LocalStorageService(@Value("${justeks.upload.dir:./uploads}") String directory) {
        this.root = Paths.get(directory).toAbsolutePath().normalize();
    }

    @Override
    public StoredFile store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidUploadException("An empty file was uploaded.");
        }
        if (file.getSize() > UploadRules.MAX_FILE_BYTES) {
            throw new InvalidUploadException("Each file must be 10 MB or smaller.");
        }

        var extension = UploadRules.extensionOf(file.getOriginalFilename());
        if (!UploadRules.isAllowed(extension, file.getContentType())) {
            throw new InvalidUploadException(
                "Accepted file types: " + String.join(", ", UploadRules.allowedExtensions()) + ".");
        }

        var key = UUID.randomUUID() + "." + extension;
        try {
            Files.createDirectories(root);
            file.transferTo(resolve(key));
            return new StoredFile(key, safeOriginalName(file.getOriginalFilename()),
                file.getContentType(), file.getSize());
        } catch (IOException e) {
            throw new UncheckedIOException("Could not store upload", e);
        }
    }

    @Override
    public List<StoredFile> storeAll(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return List.of();
        }
        if (files.size() > UploadRules.MAX_FILES_PER_REQUEST) {
            throw new InvalidUploadException(
                "Please attach no more than " + UploadRules.MAX_FILES_PER_REQUEST + " files.");
        }

        var stored = new ArrayList<StoredFile>();
        try {
            for (var file : files) {
                stored.add(store(file));
            }
        } catch (RuntimeException e) {
            // One bad file must not leave the earlier ones behind.
            stored.forEach(f -> delete(f.key()));
            throw e;
        }
        return stored;
    }

    @Override
    public Resource load(String key) {
        return new FileSystemResource(resolve(key));
    }

    @Override
    public void delete(String key) {
        try {
            Files.deleteIfExists(resolve(key));
        } catch (IOException e) {
            // Worth knowing about, but not worth failing a request over: the
            // caller is usually already unwinding a failed submission.
            log.warn("Could not delete stored file {}", key, e);
        }
    }

    /**
     * Turn a key into a path, refusing anything that is not one of ours.
     *
     * The shape is checked by parsing rather than by pattern: a key is a UUID,
     * optionally followed by one short alphanumeric extension. The resolved
     * path is then confirmed to sit under the root - belt and braces, because
     * this is the one place a traversal would pay off.
     */
    private Path resolve(String key) {
        if (!isOurKey(key)) {
            throw new InvalidUploadException("Unknown file.");
        }
        var path = root.resolve(key).normalize();
        if (!path.startsWith(root)) {
            throw new InvalidUploadException("Unknown file.");
        }
        return path;
    }

    private boolean isOurKey(String key) {
        if (key == null || key.isBlank()) {
            return false;
        }
        var dot = key.indexOf('.');
        var name = dot < 0 ? key : key.substring(0, dot);
        var extension = dot < 0 ? "" : key.substring(dot + 1);

        try {
            // Rejects anything that is not exactly one canonical UUID.
            if (!UUID.fromString(name).toString().equals(name)) {
                return false;
            }
        } catch (IllegalArgumentException e) {
            return false;
        }
        return extension.isEmpty() || UploadRules.extensionOf("x." + extension).equals(extension);
    }

    /** Keep a readable name for the admin download, without any path in it. */
    private String safeOriginalName(String filename) {
        if (filename == null || filename.isBlank()) {
            return "attachment";
        }
        var base = Paths.get(filename).getFileName().toString();
        var cleaned = new StringBuilder(base.length());
        for (var c : base.toCharArray()) {
            // Strip control characters; they have no place in a download name.
            if (c >= ' ' && c != 127) {
                cleaned.append(c);
            }
        }
        var name = cleaned.isEmpty() ? "attachment" : cleaned.toString();
        return name.length() <= 255 ? name : name.substring(name.length() - 255);
    }
}
