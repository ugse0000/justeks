package com.justeks.common;

import com.justeks.AbstractIntegrationTest;
import com.justeks.enquiry.EnquiryType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

class ReferenceNumberGeneratorTest extends AbstractIntegrationTest {

    @Autowired
    ReferenceNumberGenerator generator;

    @Test
    void bicimDogru() {
        assertThat(generator.next(EnquiryType.GENERAL, 2026)).matches("JTE-2026-[0-9]{5}");
        assertThat(generator.next(EnquiryType.SOURCING, 2026)).matches("JTR-2026-[0-9]{5}");
        assertThat(generator.next(EnquiryType.BULK, 2026)).matches("JTB-2026-[0-9]{5}");
        assertThat(generator.next(EnquiryType.TRADE_ACCOUNT, 2026)).matches("JTA-2026-[0-9]{5}");
    }

    @Test
    void esZamanliCagrilarTekilUretir() throws Exception {
        // İki eş zamanlı form gönderimi aynı referansı almamalı: numarayı
        // Postgres sequence'i veriyor, uygulama içi bir sayaç değil.
        try (var pool = Executors.newFixedThreadPool(16)) {
            var futures = IntStream.range(0, 200)
                .mapToObj(i -> pool.submit(() -> generator.next(EnquiryType.GENERAL, 2026)))
                .toList();

            var references = new HashSet<String>();
            for (var f : futures) {
                references.add(f.get());
            }

            assertThat(references).hasSize(200);
        }
    }

    @Test
    void yilReferansaGirer() {
        assertThat(generator.next(EnquiryType.GENERAL, 2027)).startsWith("JTE-2027-");
    }
}
