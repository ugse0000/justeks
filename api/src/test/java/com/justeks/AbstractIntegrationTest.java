package com.justeks;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.PostgreSQLContainer;

/**
 * Base for tests that need the real database.
 *
 * The container is started once in a static initialiser rather than managed by
 * @Testcontainers/@Container. Those annotations tie the container's life to the
 * test class, so with several classes extending this base the first class to
 * finish stopped Postgres and every later class failed on a dead connection
 * pool — after waiting out a 30s Hikari timeout per test. Started this way it
 * lives for the whole JVM and Ryuk removes it on exit.
 *
 * Flyway migrates it on context startup, so these tests exercise the real
 * migrations rather than a schema Hibernate guessed.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// The rate limiter is exercised directly in RateLimitFilterTest. Here it would
// only make later tests in a class fail for reasons unrelated to what they
// assert, since they all post from the same loopback address.
@TestPropertySource(properties = "justeks.rate-limit.max-requests=10000")
public abstract class AbstractIntegrationTest {

    @ServiceConnection
    static final PostgreSQLContainer<?> POSTGRES =
        new PostgreSQLContainer<>("postgres:17-alpine");

    static {
        POSTGRES.start();
    }
}
