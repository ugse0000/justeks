package com.justeks.enquiry;

import java.util.EnumMap;
import java.util.Map;
import java.util.Set;

/**
 * Where an enquiry has got to.
 *
 * Transitions are declared rather than derived from the enum order: an enquiry
 * can be confirmed straight from a quote without a negotiation round, and any
 * open enquiry can be closed. Deriving from ordinal would allow neither.
 */
public enum EnquiryStatus {

    NEW,
    UNDER_REVIEW,
    QUOTED,
    NEGOTIATION,
    CONFIRMED,
    CLOSED;

    private static final Map<EnquiryStatus, Set<EnquiryStatus>> ALLOWED =
        new EnumMap<>(EnquiryStatus.class);

    static {
        ALLOWED.put(NEW, Set.of(UNDER_REVIEW, CLOSED));
        ALLOWED.put(UNDER_REVIEW, Set.of(QUOTED, CLOSED));
        ALLOWED.put(QUOTED, Set.of(NEGOTIATION, CONFIRMED, CLOSED));
        ALLOWED.put(NEGOTIATION, Set.of(CONFIRMED, CLOSED));
        ALLOWED.put(CONFIRMED, Set.of(CLOSED));
        // Closed is terminal: reopening would lose the audit trail of why it
        // was closed. A new enquiry is the honest way back.
        ALLOWED.put(CLOSED, Set.of());
    }

    public boolean canTransitionTo(EnquiryStatus next) {
        return ALLOWED.get(this).contains(next);
    }
}
