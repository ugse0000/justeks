package com.justeks.enquiry;

import com.justeks.AbstractIntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class BulkAndTradeAccountControllerTest extends AbstractIntegrationTest {

    @LocalServerPort
    int port;

    @Autowired
    EnquiryRepository enquiries;

    @Autowired
    BulkRequirementDetailRepository bulkDetails;

    @Autowired
    TradeAccountDetailRepository tradeAccountDetails;

    @BeforeEach
    void clean() {
        bulkDetails.deleteAll();
        tradeAccountDetails.deleteAll();
        enquiries.deleteAll();
    }

    private ResponseEntity<Map> post(String path, Object body) {
        return RestClient.create("http://localhost:" + port)
            .post().uri(path)
            .contentType(MediaType.APPLICATION_JSON)
            .body(body)
            .exchange((request, response) ->
                ResponseEntity.status(response.getStatusCode()).body(response.bodyTo(Map.class)));
    }

    private Map<String, Object> bulk() {
        var body = new HashMap<String, Object>();
        body.put("contactName", "Jane Doe");
        body.put("email", "jane@acme.example");
        body.put("country", "United Kingdom");
        body.put("articleOrFabric", "Linen poplin");
        body.put("requiredQuantity", "20000 m");
        body.put("gsm", "160-180");
        return body;
    }

    private Map<String, Object> tradeAccount() {
        var body = new HashMap<String, Object>();
        body.put("companyName", "Acme Textiles Ltd");
        body.put("contactName", "Jane Doe");
        body.put("email", "jane@acme.example");
        body.put("country", "United Kingdom");
        body.put("vatNumber", "GB123456789");
        body.put("companyWebsite", "https://acme.example");
        return body;
    }

    @Test
    void bulkTalebiKaydedilir() {
        var res = post("/api/v1/bulk-requirements", bulk());

        assertThat(res.getStatusCode().value()).isEqualTo(201);
        assertThat((String) res.getBody().get("referenceNo")).startsWith("JTB-");

        var saved = enquiries.findAll().getFirst();
        assertThat(saved.getType()).isEqualTo(EnquiryType.BULK);
        var detail = bulkDetails.findByEnquiryId(saved.getId()).orElseThrow();
        assertThat(detail.getArticleOrFabric()).isEqualTo("Linen poplin");
        assertThat(detail.getGsm()).isEqualTo("160-180");
    }

    @Test
    void tradeAccountBasvurusuKaydedilir() {
        var res = post("/api/v1/trade-account-applications", tradeAccount());

        assertThat(res.getStatusCode().value()).isEqualTo(201);
        assertThat((String) res.getBody().get("referenceNo")).startsWith("JTA-");

        var saved = enquiries.findAll().getFirst();
        assertThat(saved.getType()).isEqualTo(EnquiryType.TRADE_ACCOUNT);
        var detail = tradeAccountDetails.findByEnquiryId(saved.getId()).orElseThrow();
        assertThat(detail.getVatNumber()).isEqualTo("GB123456789");
        // Başvuranın gerçek sitesi honeypot'a değil kendi alanına gider.
        assertThat(detail.getCompanyWebsite()).isEqualTo("https://acme.example");
    }

    @Test
    void tradeAccountSirketAdiZorunlu() {
        var body = tradeAccount();
        body.remove("companyName");

        var res = post("/api/v1/trade-account-applications", body);

        assertThat(res.getStatusCode().value()).isEqualTo(400);
        assertThat((Map<String, ?>) res.getBody().get("errors")).containsKey("companyName");
        assertThat(enquiries.count()).isZero();
    }

    @Test
    void honeypotHerIkiFormdaDaSessizceReddeder() {
        var bulkBody = bulk();
        bulkBody.put("website", "http://spam.example");
        assertThat(post("/api/v1/bulk-requirements", bulkBody).getStatusCode().value()).isEqualTo(201);

        var accountBody = tradeAccount();
        accountBody.put("website", "http://spam.example");
        assertThat(post("/api/v1/trade-account-applications", accountBody).getStatusCode().value())
            .isEqualTo(201);

        assertThat(enquiries.count()).isZero();
    }
}
