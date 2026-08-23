package com.justeks.common;

/** A file the upload rules refuse: wrong type, too large, or too many. */
public class InvalidUploadException extends RuntimeException {

    public InvalidUploadException(String message) {
        super(message);
    }
}
