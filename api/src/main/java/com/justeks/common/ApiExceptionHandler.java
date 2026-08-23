package com.justeks.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Turns failures into a shape the forms can render.
 *
 * Validation errors come back as {"errors": {"email": "..."}} so a form can put
 * each message beside the field it belongs to rather than showing one banner.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> validation(MethodArgumentNotValidException ex) {
        var errors = new LinkedHashMap<String, String>();
        for (var error : ex.getBindingResult().getFieldErrors()) {
            // First message per field wins: a field with several broken
            // constraints still gets one line under it.
            errors.putIfAbsent(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> illegalState(IllegalStateException ex) {
        // Raised by the domain for a transition the status flow forbids.
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(Map.of("errors", Map.of("status", ex.getMessage())));
    }

    @ExceptionHandler(InvalidUploadException.class)
    public ResponseEntity<Map<String, Object>> invalidUpload(InvalidUploadException ex) {
        return ResponseEntity.badRequest().body(Map.of("errors", Map.of("files", ex.getMessage())));
    }

    /**
     * Statuses a controller chose deliberately, such as 404 for an unknown
     * reference. Without this the catch-all below would turn every one of them
     * into a 500 - the handler is registered for Exception, and
     * ResponseStatusException is one.
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> deliberate(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode())
            .body(Map.of("errors", Map.of("form", ex.getReason() == null ? "" : ex.getReason())));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> unexpected(Exception ex) {
        // Log the detail, return none: an enquiry form is not the place to
        // surface a stack trace or a database message.
        log.error("Unhandled error serving an API request", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("errors", Map.of("form", "Something went wrong. Please try again.")));
    }
}
