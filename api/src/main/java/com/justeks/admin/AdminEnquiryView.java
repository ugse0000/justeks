package com.justeks.admin;

import com.justeks.enquiry.Enquiry;
import com.justeks.enquiry.EnquiryStatus;
import com.justeks.enquiry.EnquiryType;

import java.time.Instant;
import java.util.List;

/**
 * What the admin screens see.
 *
 * A view rather than the entity: source IP and user agent are kept for abuse
 * investigation and have no business being served to a browser, and returning
 * the entity would leak whatever gets added to it later.
 */
public record AdminEnquiryView(
    String referenceNo,
    EnquiryType type,
    EnquiryStatus status,
    String companyName,
    String contactName,
    String email,
    String phone,
    String country,
    String city,
    String message,
    String locale,
    Instant createdAt,
    Instant updatedAt,
    List<AttachmentView> attachments
) {

    public record AttachmentView(String storedKey, String filename, String contentType, long sizeBytes) {
    }

    public static AdminEnquiryView of(Enquiry e, List<AttachmentView> attachments) {
        return new AdminEnquiryView(
            e.getReferenceNo(), e.getType(), e.getStatus(),
            e.getCompanyName(), e.getContactName(), e.getEmail(), e.getPhone(),
            e.getCountry(), e.getCity(), e.getMessage(), e.getLocale(),
            e.getCreatedAt(), e.getUpdatedAt(), attachments);
    }

    /** List rows leave out the message body and the attachments. */
    public static AdminEnquiryView summary(Enquiry e) {
        return new AdminEnquiryView(
            e.getReferenceNo(), e.getType(), e.getStatus(),
            e.getCompanyName(), e.getContactName(), e.getEmail(), e.getPhone(),
            e.getCountry(), e.getCity(), null, e.getLocale(),
            e.getCreatedAt(), e.getUpdatedAt(), List.of());
    }
}
