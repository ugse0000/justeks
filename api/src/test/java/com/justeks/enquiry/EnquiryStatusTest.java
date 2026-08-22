package com.justeks.enquiry;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class EnquiryStatusTest {

    @Test
    void ileriGecisIzinli() {
        assertThat(EnquiryStatus.NEW.canTransitionTo(EnquiryStatus.UNDER_REVIEW)).isTrue();
        assertThat(EnquiryStatus.QUOTED.canTransitionTo(EnquiryStatus.NEGOTIATION)).isTrue();
    }

    @Test
    void pazarliksizOnayIzinli() {
        // Bir teklif pazarlık turu olmadan da onaylanabilir.
        assertThat(EnquiryStatus.QUOTED.canTransitionTo(EnquiryStatus.CONFIRMED)).isTrue();
    }

    @Test
    void geriGecisYasak() {
        assertThat(EnquiryStatus.QUOTED.canTransitionTo(EnquiryStatus.NEW)).isFalse();
        assertThat(EnquiryStatus.CONFIRMED.canTransitionTo(EnquiryStatus.QUOTED)).isFalse();
    }

    @Test
    void asamaAtlamakYasak() {
        assertThat(EnquiryStatus.NEW.canTransitionTo(EnquiryStatus.QUOTED)).isFalse();
    }

    @Test
    void herDurumdanClosedIzinli() {
        for (var s : EnquiryStatus.values()) {
            if (s != EnquiryStatus.CLOSED) {
                assertThat(s.canTransitionTo(EnquiryStatus.CLOSED))
                    .as("%s -> CLOSED", s).isTrue();
            }
        }
    }

    @Test
    void closedTerminal() {
        for (var s : EnquiryStatus.values()) {
            assertThat(EnquiryStatus.CLOSED.canTransitionTo(s)).as("CLOSED -> %s", s).isFalse();
        }
    }

    @Test
    void kendineGecisYasak() {
        for (var s : EnquiryStatus.values()) {
            assertThat(s.canTransitionTo(s)).as("%s -> %s", s, s).isFalse();
        }
    }

    @Test
    void enquiryGecersizGecisiReddeder() {
        var enquiry = new Enquiry("JTE-2026-00001", EnquiryType.GENERAL,
            "A Buyer", "buyer@example.com", "GB");

        assertThatThrownBy(() -> enquiry.updateStatus(EnquiryStatus.CONFIRMED))
            .isInstanceOf(IllegalStateException.class)
            .hasMessageContaining("JTE-2026-00001");

        assertThat(enquiry.getStatus()).isEqualTo(EnquiryStatus.NEW);
    }

    @Test
    void enquiryGecerliGecisiUygular() {
        var enquiry = new Enquiry("JTE-2026-00002", EnquiryType.GENERAL,
            "A Buyer", "buyer@example.com", "GB");

        enquiry.updateStatus(EnquiryStatus.UNDER_REVIEW);

        assertThat(enquiry.getStatus()).isEqualTo(EnquiryStatus.UNDER_REVIEW);
    }
}
