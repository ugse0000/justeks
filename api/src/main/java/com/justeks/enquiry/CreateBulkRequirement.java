package com.justeks.enquiry;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/** The bulk order form. */
public record CreateBulkRequirement(

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

    @Size(max = 200) String articleOrFabric,
    @Size(max = 200) String composition,
    @Size(max = 100) String colour,
    @Size(max = 50) String gsm,
    @Size(max = 50) String width,
    @Size(max = 100) String requiredQuantity,
    LocalDate requiredDeliveryDate,
    @Size(max = 100) String deliveryCountry,
    @Size(max = 100) String deliveryCity,
    @Size(max = 200) String productionApplication,

    String website
) implements EnquiryFields {
}
