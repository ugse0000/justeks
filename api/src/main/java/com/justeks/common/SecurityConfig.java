package com.justeks.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final List<String> allowedOrigins;
    private final String adminUsername;
    private final String adminPassword;

    public SecurityConfig(
        @Value("${justeks.cors.allowed-origins}") String origins,
        @Value("${justeks.admin.username:admin}") String adminUsername,
        @Value("${justeks.admin.password:}") String adminPassword) {
        this.allowedOrigins = List.of(origins.split(","));
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
    }

    /**
     * Public submission endpoints, authenticated admin, nothing else.
     *
     * CSRF is off and sessions are stateless because these endpoints carry no
     * cookie: there is no ambient authority for a cross-site form to borrow,
     * and the admin API authenticates on every request instead.
     */
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .httpBasic(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/enquiries").permitAll()
                .requestMatchers("/api/v1/sourcing-requests").permitAll()
                .requestMatchers("/api/v1/bulk-requirements").permitAll()
                .requestMatchers("/api/v1/trade-account-applications").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().denyAll());

        return http.build();
    }

    /**
     * The single admin account, from the environment.
     *
     * Starting with no password set is refused outright rather than defaulting
     * to something guessable: an admin API that quietly accepts admin/admin is
     * worse than one that will not start.
     */
    @Bean
    UserDetailsService userDetailsService(PasswordEncoder encoder) {
        if (adminPassword == null || adminPassword.isBlank()) {
            throw new IllegalStateException(
                "ADMIN_PASSWORD is not set. The admin API will not start without one.");
        }
        return new InMemoryUserDetailsManager(
            User.withUsername(adminUsername)
                .password(encoder.encode(adminPassword))
                .roles("ADMIN")
                .build());
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        var config = new CorsConfiguration();
        config.setAllowedOrigins(allowedOrigins);
        config.setAllowedMethods(List.of("GET", "POST", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("Content-Type", "Authorization"));

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
