package com.justeks.enquiry;

/**
 * What the sender is asking for.
 *
 * The prefix goes into the reference number, so an enquiry's kind is legible
 * from the reference alone — a buyer quoting "JTR-2026-00042" on the phone has
 * already told us it is a sourcing request.
 */
public enum EnquiryType {

    SALES,
    SAMPLING,
    SOURCING,
    INTERNATIONAL_TRADE,
    TECHNICAL,
    GENERAL,
    BULK,
    TRADE_ACCOUNT;

    /** Reference-number prefix. Phase 2 adds JTS (sample) and JTQ (RFQ). */
    public String prefix() {
        return switch (this) {
            case SOURCING -> "JTR";
            case BULK -> "JTB";
            case TRADE_ACCOUNT -> "JTA";
            default -> "JTE";
        };
    }
}
