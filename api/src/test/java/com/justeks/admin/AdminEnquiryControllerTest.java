package com.justeks.admin;

import com.justeks.AbstractIntegrationTest;
import com.justeks.enquiry.Enquiry;
import com.justeks.enquiry.EnquiryRepository;
import com.justeks.enquiry.EnquiryStatus;
import com.justeks.enquiry.EnquiryType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class AdminEnquiryControllerTest extends AbstractIntegrationTest {

    @LocalServerPort
    int port;

    @Autowired
    EnquiryRepository enquiries;

    @BeforeEach
    void seed() {
        enquiries.deleteAll();
        enquiries.save(new Enquiry("JTE-2026-90001", EnquiryType.SALES,
            "Jane Doe", "jane@acme.example", "United Kingdom"));
        enquiries.save(new Enquiry("JTR-2026-90002", EnquiryType.SOURCING,
            "John Roe", "john@beta.example", "Türkiye"));
    }

    private String basic(String user, String password) {
        return "Basic " + Base64.getEncoder().encodeToString(
            (user + ":" + password).getBytes(StandardCharsets.UTF_8));
    }

    private ResponseEntity<Map> get(String path, String credentials) {
        var request = RestClient.create("http://localhost:" + port).get().uri(path);
        if (credentials != null) {
            request = request.header(HttpHeaders.AUTHORIZATION, credentials);
        }
        return request.exchange((req, res) ->
            ResponseEntity.status(res.getStatusCode())
                .body(res.getStatusCode().is2xxSuccessful() ? res.bodyTo(Map.class) : Map.of()));
    }

    private ResponseEntity<Map> patch(String path, Object body, String credentials) {
        return RestClient.create("http://localhost:" + port)
            .patch().uri(path)
            .header(HttpHeaders.AUTHORIZATION, credentials)
            .contentType(MediaType.APPLICATION_JSON)
            .body(body)
            .exchange((req, res) -> ResponseEntity.status(res.getStatusCode())
                .body(res.getStatusCode().is2xxSuccessful() ? res.bodyTo(Map.class) : Map.of()));
    }

    private String admin() {
        return basic(ADMIN_USER, ADMIN_PASSWORD);
    }

    @Test
    void kimliksizErisimReddedilir() {
        assertThat(get("/api/v1/admin/enquiries", null).getStatusCode().value()).isEqualTo(401);
    }

    @Test
    void yanlisSifreReddedilir() {
        assertThat(get("/api/v1/admin/enquiries", basic(ADMIN_USER, "wrong")).getStatusCode().value())
            .isEqualTo(401);
    }

    @Test
    void listeYeniIlkSiralanir() {
        var res = get("/api/v1/admin/enquiries", admin());

        assertThat(res.getStatusCode().value()).isEqualTo(200);
        assertThat((Integer) res.getBody().get("totalElements")).isEqualTo(2);
    }

    @Test
    void tipeGoreFiltrelenir() {
        var res = get("/api/v1/admin/enquiries?type=SOURCING", admin());

        assertThat((Integer) res.getBody().get("totalElements")).isEqualTo(1);
    }

    @Test
    void listeMesajGovdesiTasimaz() {
        // Liste satırları özet; gövde yalnızca detayda döner.
        var res = get("/api/v1/admin/enquiries", admin());
        var first = (Map<?, ?>) ((java.util.List<?>) res.getBody().get("content")).getFirst();

        assertThat(first.get("message")).isNull();
    }

    @Test
    void detayIstekBaglaminiSizdirmaz() {
        // sourceIp ve userAgent kötüye kullanım incelemesi için tutulur;
        // tarayıcıya servis edilmezler.
        var res = get("/api/v1/admin/enquiries/JTE-2026-90001", admin());

        assertThat(res.getBody()).containsKey("referenceNo");
        assertThat(res.getBody()).doesNotContainKeys("sourceIp", "userAgent", "id");
    }

    @Test
    void bilinmeyenReferans404() {
        assertThat(get("/api/v1/admin/enquiries/JTE-2026-00000", admin()).getStatusCode().value())
            .isEqualTo(404);
    }

    @Test
    void gecerliDurumGecisiUygulanir() {
        var res = patch("/api/v1/admin/enquiries/JTE-2026-90001/status",
            Map.of("status", "UNDER_REVIEW"), admin());

        assertThat(res.getStatusCode().value()).isEqualTo(200);
        assertThat(enquiries.findByReferenceNo("JTE-2026-90001").orElseThrow().getStatus())
            .isEqualTo(EnquiryStatus.UNDER_REVIEW);
    }

    @Test
    void gecersizDurumGecisi409Doner() {
        // İstek biçimsel olarak doğru; izin vermeyen şey durumun kendisi.
        var res = patch("/api/v1/admin/enquiries/JTE-2026-90001/status",
            Map.of("status", "CONFIRMED"), admin());

        assertThat(res.getStatusCode().value()).isEqualTo(409);
        assertThat(enquiries.findByReferenceNo("JTE-2026-90001").orElseThrow().getStatus())
            .isEqualTo(EnquiryStatus.NEW);
    }

    @Test
    void metaFiltreDegerleriniDoner() {
        var res = get("/api/v1/admin/enquiries/meta", admin());

        assertThat(res.getStatusCode().value()).isEqualTo(200);
        assertThat((java.util.List<String>) res.getBody().get("statuses"))
            .contains("NEW", "CLOSED");
        assertThat((java.util.List<String>) res.getBody().get("types"))
            .contains("SOURCING", "BULK");
    }
}
