package com.justeks.enquiry;

/**
 * The questions every form asks.
 *
 * Four forms carry these same fields plus their own. Naming the shared set
 * means the mapping into an Enquiry lives in one place instead of being
 * copied per form, where the copies drift.
 */
public interface EnquiryFields {

    String companyName();
    String contactName();
    String email();
    String phone();
    String country();
    String city();
    String message();
    String locale();

    /** Honeypot: hidden from people, so anything filling it is automated. */
    String website();

    default boolean looksAutomated() {
        return website() != null && !website().isBlank();
    }
}
