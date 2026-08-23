package com.justeks.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Where uploaded files go.
 *
 * Phase 1 writes to local disk. Moving to S3 or R2 means adding one
 * implementation; no caller changes, because nothing above this interface
 * knows what a path is.
 */
public interface StorageService {

    /** Validates and stores one file, returning what was written. */
    StoredFile store(MultipartFile file);

    /** Stores several, applying the per-request file count limit. */
    List<StoredFile> storeAll(List<MultipartFile> files);

    Resource load(String key);

    /**
     * Removes a stored file. Used to undo writes when the surrounding
     * transaction rolls back, so a failed submission leaves no orphans.
     */
    void delete(String key);
}
