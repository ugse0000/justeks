package com.justeks.common;

import com.justeks.enquiry.EnquiryType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Issues human-facing enquiry references, e.g. JTE-2026-00001.
 *
 * The counter is a Postgres sequence rather than a max()+1 read, so concurrent
 * submissions cannot be handed the same number: nextval is atomic and does not
 * take a lock other writers wait behind.
 *
 * The counter runs continuously rather than resetting each year. A reset would
 * need a lock plus a "have we rolled over yet" check on every call, and the
 * year is already in the reference for anyone reading it.
 */
@Component
public class ReferenceNumberGenerator {

    private final JdbcTemplate jdbc;

    public ReferenceNumberGenerator(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public String next(EnquiryType type, int year) {
        var sequence = jdbc.queryForObject("select nextval('enquiry_reference_seq')", Long.class);
        return "%s-%d-%05d".formatted(type.prefix(), year, sequence);
    }
}
