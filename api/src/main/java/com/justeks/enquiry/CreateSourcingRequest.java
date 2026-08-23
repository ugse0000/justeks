package com.justeks.enquiry;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

/**
 * The sourcing desk form.
 *
 * Bound from multipart form fields rather than a JSON part, so the browser can
 * send the answers and the attachments in one FormData without the caller
 * having to wrap the JSON in a Blob.
 */
public record CreateSourcingRequest(

    @Size(max = 200) String companyName,
    @NotBlank(message = "Tell us who to reply to") @Size(max = 200) String contactName,
    @NotBlank(message = "We need an email address to reply to")
    @Email(message = "That does not look like an email address")
    @Size(max = 320) String email,
    @Size(max = 50) String phone,
    @NotBlank(message = "Tell us which country you are buying for")
    @Size(max = 100) String country,
    @Size(max = 100) String city,
    @Size(max = 5000) String message,
    @Size(max = 8) String locale,

    @Size(max = 200) String fabricType,
    @Size(max = 200) String composition,
    @Size(max = 50) String gsm,
    @Size(max = 50) String width,
    @Size(max = 100) String colour,
    @Size(max = 200) String application,
    @Size(max = 100) String requiredQuantity,
    @Size(max = 100) String deliveryCountry,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate requiredDate,

    /** Honeypot. Must stay empty. */
    String website
) {
    public boolean looksAutomated() {
        return website != null && !website.isBlank();
    }
}
