package com.justeks.storage;

import java.util.Map;
import java.util.Set;

/**
 * What an upload has to satisfy.
 *
 * Extension and declared content type are both checked, and they have to agree
 * with each other. Both still come from the client, so neither is proof of
 * what a file contains — the real protection is that stored files are written
 * under a UUID, outside any served directory, and are only ever handed back
 * through an authenticated download that sets its own content type.
 */
public final class UploadRules {

    public static final long MAX_FILE_BYTES = 10L * 1024 * 1024;
    public static final int MAX_FILES_PER_REQUEST = 5;

    /** Extension to the content types we accept for it. */
    private static final Map<String, Set<String>> ALLOWED = Map.of(
        "pdf",  Set.of("application/pdf"),
        "jpg",  Set.of("image/jpeg"),
        "jpeg", Set.of("image/jpeg"),
        "png",  Set.of("image/png"),
        "webp", Set.of("image/webp"),
        "heic", Set.of("image/heic", "image/heif"),
        "xlsx", Set.of("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
        "docx", Set.of("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    );

    private UploadRules() {
    }

    public static Set<String> allowedExtensions() {
        return ALLOWED.keySet();
    }

    public static boolean isAllowed(String extension, String contentType) {
        var types = ALLOWED.get(extension);
        return types != null && contentType != null && types.contains(contentType.toLowerCase());
    }

    /**
     * The part after the last dot, lowercased.
     *
     * Returns empty for a name with no extension, and for one whose "extension"
     * contains a path separator — "evil.jpg/../../x" must not read as "jpg".
     */
    public static String extensionOf(String filename) {
        if (filename == null) {
            return "";
        }
        var dot = filename.lastIndexOf('.');
        if (dot < 0 || dot == filename.length() - 1) {
            return "";
        }
        var extension = filename.substring(dot + 1).toLowerCase();
        return extension.matches("[a-z0-9]{1,8}") ? extension : "";
    }
}
