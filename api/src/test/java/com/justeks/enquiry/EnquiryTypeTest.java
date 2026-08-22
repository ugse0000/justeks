package com.justeks.enquiry;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EnquiryTypeTest {

    @Test
    void onekleriDogru() {
        assertThat(EnquiryType.SOURCING.prefix()).isEqualTo("JTR");
        assertThat(EnquiryType.BULK.prefix()).isEqualTo("JTB");
        assertThat(EnquiryType.TRADE_ACCOUNT.prefix()).isEqualTo("JTA");
    }

    @Test
    void digerTumTipleriJTE() {
        for (var t : EnquiryType.values()) {
            if (t != EnquiryType.SOURCING && t != EnquiryType.BULK
                && t != EnquiryType.TRADE_ACCOUNT) {
                assertThat(t.prefix()).as("%s", t).isEqualTo("JTE");
            }
        }
    }

    @Test
    void herOnekUcHarf() {
        for (var t : EnquiryType.values()) {
            assertThat(t.prefix()).as("%s", t).matches("JT[A-Z]");
        }
    }
}
