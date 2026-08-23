package com.justeks.enquiry;

import com.justeks.AbstractIntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClient;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class EnquiryControllerTest extends AbstractIntegrationTest {

    @LocalServerPort
    int port;

    @Autowired
    EnquiryRepository repository;

    /**
     * Posts and returns the response without throwing on 4xx.
     *
     * RestClient's retrieve() raises for error statuses, and half of these
     * tests are about error statuses. exchange() hands back the raw response
     * so the assertion can look at the code and the body together.
     */
    private ResponseEntity<Map> post(Object body) {
        return RestClient.create("http://localhost:" + port)
            .post().uri("/api/v1/enquiries")
            .contentType(MediaType.APPLICATION_JSON)
            .body(body)
            .exchange((request, response) ->
                ResponseEntity.status(response.getStatusCode()).body(response.bodyTo(Map.class)));
    }

    private ResponseEntity<String> postRaw(Object body) {
        return RestClient.create("http://localhost:" + port)
            .post().uri("/api/v1/enquiries")
            .contentType(MediaType.APPLICATION_JSON)
            .body(body)
            .exchange((request, response) ->
                ResponseEntity.status(response.getStatusCode()).body(response.bodyTo(String.class)));
    }

    @BeforeEach
    void clean() {
        repository.deleteAll();
    }

    private Map<String, Object> valid() {
        var body = new HashMap<String, Object>();
        body.put("type", "SALES");
        body.put("companyName", "Acme Textiles");
        body.put("contactName", "Jane Doe");
        body.put("email", "jane@acme.example");
        body.put("country", "United Kingdom");
        body.put("message", "We need 5000 m linen.");
        body.put("locale", "en");
        return body;
    }

    @Test
    void gecerliTalepKaydedilir() {
        var res = post(valid());

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat((String) res.getBody().get("referenceNo")).matches("JTE-[0-9]{4}-[0-9]{5}");
        assertThat(repository.count()).isEqualTo(1);

        var saved = repository.findAll().getFirst();
        assertThat(saved.getStatus()).isEqualTo(EnquiryStatus.NEW);
        assertThat(saved.getType()).isEqualTo(EnquiryType.SALES);
        assertThat(saved.getCompanyName()).isEqualTo("Acme Textiles");
    }

    @Test
    void talepTipiOnekiReferansaYansir() {
        var body = valid();
        body.put("type", "SOURCING");

        var res = post(body);

        assertThat((String) res.getBody().get("referenceNo")).startsWith("JTR-");
    }

    @Test
    void gecersizEpostaReddedilir() {
        var body = valid();
        body.put("email", "not-an-email");

        var res = post(body);

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat((Map<String, ?>) res.getBody().get("errors")).containsKey("email");
        assertThat(repository.count()).isZero();
    }

    @Test
    void zorunluAlanEksikReddedilir() {
        var body = valid();
        body.remove("contactName");

        var res = post(body);

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat((Map<String, ?>) res.getBody().get("errors")).containsKey("contactName");
        assertThat(repository.count()).isZero();
    }

    @Test
    void honeypotDoluIseSessizceReddedilir() {
        // Bot'a yakalandığını söylemek, onu yazan kişiye alanı boş bırakmayı
        // öğretir. Aynı 201 döner, kayıt oluşmaz.
        var body = valid();
        body.put("website", "http://spam.example");

        var res = post(body);

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(repository.count()).isZero();
    }

    @Test
    void mesajUzunlukSiniriUygulanir() {
        var body = valid();
        body.put("message", "x".repeat(5001));

        var res = post(body);

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat((Map<String, ?>) res.getBody().get("errors")).containsKey("message");
    }

    @Test
    void istekBaglamiKaydedilir() {
        post(valid());

        var saved = repository.findAll().getFirst();
        assertThat(saved.getLocale()).isEqualTo("en");
    }

    @Test
    void hataYanitiIcSelDetaySizdirmaz() {
        var body = valid();
        body.put("email", "not-an-email");

        var res = postRaw(body);

        assertThat(res.getBody()).doesNotContain("Exception", "org.springframework", "SQL");
    }
}
