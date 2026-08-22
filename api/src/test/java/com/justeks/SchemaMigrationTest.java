package com.justeks;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** Exercises V1__enquiry.sql against a real Postgres, not a guessed schema. */
class SchemaMigrationTest extends AbstractIntegrationTest {

    @Autowired
    JdbcTemplate jdbc;

    private long insertEnquiry(String reference) {
        return jdbc.queryForObject(
            "insert into enquiry (reference_no, type, status, contact_name, email, country) "
                + "values (?, 'GENERAL', 'NEW', 'A Buyer', 'buyer@example.com', 'GB') "
                + "returning id",
            Long.class, reference);
    }

    @Test
    void tablolarOlusturuldu() {
        var tables = jdbc.queryForList(
            "select table_name from information_schema.tables where table_schema = 'public'",
            String.class);

        assertThat(tables).contains(
            "enquiry", "sourcing_request_detail", "bulk_requirement_detail",
            "trade_account_detail", "enquiry_attachment");
    }

    @Test
    void referansNumarasiTekil() {
        insertEnquiry("JTE-2026-00001");

        assertThatThrownBy(() -> insertEnquiry("JTE-2026-00001"))
            .isInstanceOf(DuplicateKeyException.class);
    }

    @Test
    void detayKaydiCascadeSilinir() {
        // A detail row has no meaning without its enquiry, so deleting the
        // enquiry must take it with it rather than leaving an orphan.
        var id = insertEnquiry("JTR-2026-00002");
        jdbc.update("insert into sourcing_request_detail (enquiry_id, fabric_type) values (?, 'Linen')", id);

        assertThat(countDetails(id)).isEqualTo(1);

        jdbc.update("delete from enquiry where id = ?", id);

        assertThat(countDetails(id)).isZero();
    }

    @Test
    void referansDizisiArtiyor() {
        var first = jdbc.queryForObject("select nextval('enquiry_reference_seq')", Long.class);
        var second = jdbc.queryForObject("select nextval('enquiry_reference_seq')", Long.class);

        assertThat(second).isEqualTo(first + 1);
    }

    private Integer countDetails(long enquiryId) {
        return jdbc.queryForObject(
            "select count(*) from sourcing_request_detail where enquiry_id = ?",
            Integer.class, enquiryId);
    }
}
