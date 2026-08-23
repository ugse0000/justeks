package com.justeks.enquiry;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * The trade account application.
 *
 * companyWebsite, not website: `website` is the honeypot every form carries,
 * and an applicant's real site must not land in it.
 */
public record CreateTradeAccountApplication(

    @NotBlank(message = "We need your company name") @Size(max = 200) String companyName,
    @NotBlank(message = "Tell us who to reply to") @Size(max = 200) String contactName,
    @NotBlank(message = "We need an email address to reply to")
    @Email(message = "That does not look like an email address")
    @Size(max = 320) String email,
    @Size(max = 50) String phone,
    @NotBlank(message = "Tell us which country you are trading from")
    @Size(max = 100) String country,
    @Size(max = 100) String city,
    @Size(max = 5000) String message,
    @Size(max = 8) String locale,

    @Size(max = 100) String companyRegistration,
    @Size(max = 100) String vatNumber,
    @Size(max = 100) String businessType,
    @Size(max = 255) String companyWebsite,
    @Size(max = 100) String annualVolumeEstimate,

    String website
) implements EnquiryFields {
}
