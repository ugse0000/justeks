package com.justeks.storage;

/**
 * A file we accepted and put somewhere.
 *
 * `key` is what the storage layer knows it by — a UUID, never the sender's
 * filename. `originalFilename` is kept only so the admin download can offer a
 * name a person recognises.
 */
public record StoredFile(
    String key,
    String originalFilename,
    String contentType,
    long sizeBytes
) {
}
