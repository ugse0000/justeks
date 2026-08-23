package com.justeks.common;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Caps how often one address can submit a form.
 *
 * A sliding window rather than a fixed one: with fixed windows a caller can
 * send the whole allowance at the end of one window and again at the start of
 * the next, which is twice the limit across the boundary.
 *
 * State is in memory, so the limit is per instance. That is correct for the
 * single-instance deployment this is built for; running several would need a
 * shared store, and the limit would otherwise multiply by the instance count.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final int maxRequests;
    private final Duration window;
    private final Clock clock;
    private final Map<String, Deque<Instant>> hits = new ConcurrentHashMap<>();

    // Two constructors, so the container needs telling which one is its own.
    @Autowired
    public RateLimitFilter(
        @Value("${justeks.rate-limit.max-requests:10}") int maxRequests,
        @Value("${justeks.rate-limit.window-minutes:10}") int windowMinutes) {
        this(maxRequests, Duration.ofMinutes(windowMinutes), Clock.systemUTC());
    }

    /** For tests: lets them drive the clock instead of waiting on real time. */
    RateLimitFilter(int maxRequests, Duration window, Clock clock) {
        this.maxRequests = maxRequests;
        this.window = window;
        this.clock = clock;
    }

    /**
     * Only public form submissions are limited.
     *
     * The admin API is left alone: it is authenticated, and someone working
     * through a list of enquiries makes far more requests than a form does.
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !("POST".equalsIgnoreCase(request.getMethod())
            && request.getRequestURI().startsWith("/api/v1/")
            && !request.getRequestURI().startsWith("/api/v1/admin"));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        var caller = RequestContexts.from(request).sourceIp();
        var now = Instant.now(clock);

        if (!allow(caller, now)) {
            var retryAfter = window.toSeconds();
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setHeader("Retry-After", String.valueOf(retryAfter));
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write(
                "{\"errors\":{\"form\":\"Too many submissions. Please try again later.\"}}");
            return;
        }

        chain.doFilter(request, response);
    }

    private boolean allow(String caller, Instant now) {
        var cutoff = now.minus(window);
        var timestamps = hits.computeIfAbsent(caller, key -> new ArrayDeque<>());

        synchronized (timestamps) {
            while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(cutoff)) {
                timestamps.pollFirst();
            }
            if (timestamps.size() >= maxRequests) {
                return false;
            }
            timestamps.addLast(now);
        }

        // Keep the map from growing without bound on a long-running instance.
        if (hits.size() > 10_000) {
            hits.entrySet().removeIf(entry -> {
                synchronized (entry.getValue()) {
                    return entry.getValue().isEmpty()
                        || entry.getValue().peekLast().isBefore(cutoff);
                }
            });
        }
        return true;
    }
}
