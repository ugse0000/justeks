package com.justeks.enquiry;

import com.justeks.AbstractIntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class SourcingControllerTest extends AbstractIntegrationTest {

    @LocalServerPort
    int port;

    @Autowired
    EnquiryRepository enquiries;

    @Autowired
    SourcingRequestDetailRepository details;

    @Autowired
    EnquiryAttachmentRepository attachments;

    @BeforeEach
    void clean() {
        attachments.deleteAll();
        details.deleteAll();
        enquiries.deleteAll();
    }

    private MultiValueMap<String, Object> form() {
        var form = new LinkedMultiValueMap<String, Object>();
        form.add("contactName", "Jane Doe");
        form.add("email", "jane@acme.example");
        form.add("country", "United Kingdom");
        form.add("fabricType", "Linen");
        form.add("gsm", "160-180");
        form.add("requiredQuantity", "2000 m / colour");
        form.add("locale", "en");
        return form;
    }

    /** Attaches a file part with its own filename and content type. */
    private void attach(MultiValueMap<String, Object> form, String name, String type, byte[] body) {
        form.add("files", new ByteArrayResource(body) {
            @Override
            public String getFilename() {
                return name;
            }
        });
    }

    private ResponseEntity<Map> post(MultiValueMap<String, Object> form) {
        return RestClient.create("http://localhost:" + port)
            .post().uri("/api/v1/sourcing-requests")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .body(form)
            .exchange((request, response) ->
                ResponseEntity.status(response.getStatusCode()).body(response.bodyTo(Map.class)));
    }

    @Test
    void dosyasizTalepKaydedilir() {
        var res = post(form());

        assertThat(res.getStatusCode().value()).isEqualTo(201);
        assertThat((String) res.getBody().get("referenceNo")).startsWith("JTR-");
        assertThat(enquiries.count()).isEqualTo(1);

        var saved = enquiries.findAll().getFirst();
        assertThat(saved.getType()).isEqualTo(EnquiryType.SOURCING);

        var detail = details.findByEnquiryId(saved.getId()).orElseThrow();
        // Serbest metin olarak saklanır: alıcı "160-180" yazar, sayı değil.
        assertThat(detail.getGsm()).isEqualTo("160-180");
        assertThat(detail.getRequiredQuantity()).isEqualTo("2000 m / colour");
    }

    @Test
    void ekliDosyaKaydedilir() {
        var form = form();
        attach(form, "spec.pdf", "application/pdf", "a specification".getBytes());

        var res = post(form);

        assertThat(res.getStatusCode().value()).isEqualTo(201);
        var saved = enquiries.findAll().getFirst();
        var files = attachments.findByEnquiryId(saved.getId());
        assertThat(files).hasSize(1);
        assertThat(files.getFirst().getOriginalFilename()).isEqualTo("spec.pdf");
        // Depolama anahtarı gönderenin adını taşımaz.
        assertThat(files.getFirst().getStoredKey()).doesNotContain("spec");
    }

    @Test
    void izinsizDosyaTumTalebiReddeder() {
        var form = form();
        attach(form, "payload.exe", "application/octet-stream", new byte[] {1, 2, 3});

        var res = post(form);

        assertThat(res.getStatusCode().value()).isEqualTo(400);
        assertThat((Map<String, ?>) res.getBody().get("errors")).containsKey("files");
        // Talep kaydedilmez; yarım kayıt kalmaz.
        assertThat(enquiries.count()).isZero();
        assertThat(attachments.count()).isZero();
    }

    @Test
    void zorunluAlanEksikReddedilir() {
        var form = form();
        form.remove("email");

        var res = post(form);

        assertThat(res.getStatusCode().value()).isEqualTo(400);
        assertThat(enquiries.count()).isZero();
    }

    @Test
    void honeypotDoluIseSessizceReddedilir() {
        var form = form();
        form.add("website", "http://spam.example");

        var res = post(form);

        assertThat(res.getStatusCode().value()).isEqualTo(201);
        assertThat(enquiries.count()).isZero();
    }
}
