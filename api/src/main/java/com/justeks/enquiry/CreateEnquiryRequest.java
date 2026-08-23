package com.justeks.enquiry;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * The contact form's payload.
 *
 * `website` is a honeypot: it is hidden from people and left out of the visible
 * form, so anything that fills it in is automated. See EnquiryService for what
 * happens when it arrives filled.
 */
public record CreateEnquiryRequest(

    @NotNull(message = "Choose a subject")
    EnquiryType type,

    @Size(max = 200)
    String companyName,

    @NotBlank(message = "Tell us who to reply to")
    @Size(max = 200)
    String contactName,

    @NotBlank(message = "We need an email address to reply to")
    @Email(message = "That does not look like an email address")
    @Size(max = 320)
    String email,

    @Size(max = 50)
    String phone,

    @NotBlank(message = "Tell us which country you are buying for")
    @Size(max = 100)
    String country,

    @Size(max = 100)
    String city,

    @Size(max = 5000, message = "Please keep the message under 5000 characters")
    String message,

    @Size(max = 8)
    String locale,

    /** Honeypot. Must stay empty. */
    String website
) implements EnquiryFields {
}
