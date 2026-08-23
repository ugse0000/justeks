package com.justeks.common;

import jakarta.servlet.FilterChain;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;

class RateLimitFilterTest {

    private static final Instant START = Instant.parse("2026-08-23T10:00:00Z");

    /** A clock the test moves by hand, so no test waits on real time. */
    private static final class TestClock extends Clock {
        private Instant now = START;

        @Override public java.time.ZoneId getZone() { return ZoneOffset.UTC; }
        @Override public Clock withZone(java.time.ZoneId zone) { return this; }
        @Override public Instant instant() { return now; }
        void advance(Duration by) { now = now.plus(by); }
    }

    private MockHttpServletRequest post(String uri, String ip) {
        var request = new MockHttpServletRequest("POST", uri);
        request.setRemoteAddr(ip);
        return request;
    }

    private int send(RateLimitFilter filter, MockHttpServletRequest request) throws Exception {
        var response = new MockHttpServletResponse();
        FilterChain chain = new MockFilterChain();
        filter.doFilter(request, response, chain);
        return response.getStatus();
    }

    @Test
    void sinirAltindaGecerliIstekGecer() throws Exception {
        var filter = new RateLimitFilter(3, Duration.ofMinutes(10), new TestClock());

        for (var i = 0; i < 3; i++) {
            assertThat(send(filter, post("/api/v1/enquiries", "1.1.1.1"))).isEqualTo(200);
        }
    }

    @Test
    void sinirAsilinca429Doner() throws Exception {
        var filter = new RateLimitFilter(3, Duration.ofMinutes(10), new TestClock());
        for (var i = 0; i < 3; i++) {
            send(filter, post("/api/v1/enquiries", "1.1.1.1"));
        }

        var response = new MockHttpServletResponse();
        filter.doFilter(post("/api/v1/enquiries", "1.1.1.1"), response, new MockFilterChain());

        assertThat(response.getStatus()).isEqualTo(429);
        assertThat(response.getHeader("Retry-After")).isEqualTo("600");
        assertThat(response.getContentAsString()).contains("Too many submissions");
    }

    @Test
    void farkliAdresEtkilenmez() throws Exception {
        var filter = new RateLimitFilter(2, Duration.ofMinutes(10), new TestClock());
        send(filter, post("/api/v1/enquiries", "1.1.1.1"));
        send(filter, post("/api/v1/enquiries", "1.1.1.1"));

        assertThat(send(filter, post("/api/v1/enquiries", "2.2.2.2"))).isEqualTo(200);
    }

    @Test
    void pencereKayarakAcilir() throws Exception {
        // Sabit pencerede sınır, pencere sınırında iki katına çıkardı.
        var clock = new TestClock();
        var filter = new RateLimitFilter(2, Duration.ofMinutes(10), clock);
        send(filter, post("/api/v1/enquiries", "1.1.1.1"));
        send(filter, post("/api/v1/enquiries", "1.1.1.1"));
        assertThat(send(filter, post("/api/v1/enquiries", "1.1.1.1"))).isEqualTo(429);

        clock.advance(Duration.ofMinutes(11));

        assertThat(send(filter, post("/api/v1/enquiries", "1.1.1.1"))).isEqualTo(200);
    }

    @Test
    void adminUcuSinirlanmaz() throws Exception {
        var filter = new RateLimitFilter(1, Duration.ofMinutes(10), new TestClock());
        send(filter, post("/api/v1/admin/enquiries", "1.1.1.1"));

        assertThat(send(filter, post("/api/v1/admin/enquiries", "1.1.1.1"))).isEqualTo(200);
    }

    @Test
    void getIstekleriSinirlanmaz() throws Exception {
        var filter = new RateLimitFilter(1, Duration.ofMinutes(10), new TestClock());
        var request = new MockHttpServletRequest("GET", "/api/v1/enquiries");
        request.setRemoteAddr("1.1.1.1");
        send(filter, request);

        var second = new MockHttpServletRequest("GET", "/api/v1/enquiries");
        second.setRemoteAddr("1.1.1.1");
        assertThat(send(filter, second)).isEqualTo(200);
    }
}
