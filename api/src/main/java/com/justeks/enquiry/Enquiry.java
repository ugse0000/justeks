package com.justeks.enquiry;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.Instant;

/**
 * One enquiry, whichever form it came from.
 *
 * Type-specific answers live in their own detail tables; this row carries what
 * every form asks and everything the admin list works from.
 */
@Entity
@Table(name = "enquiry")
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_no", nullable = false, unique = true, length = 20)
    private String referenceNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private EnquiryType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private EnquiryStatus status = EnquiryStatus.NEW;

    private String companyName;

    @Column(nullable = false)
    private String contactName;

    @Column(nullable = false, length = 320)
    private String email;

    private String phone;

    @Column(nullable = false)
    private String country;

    private String city;

    @Column(columnDefinition = "text")
    private String message;

    /** Which language it arrived in, so the reply goes back in it. */
    @Column(length = 8)
    private String locale;

    @Column(length = 45)
    private String sourceIp;

    @Column(length = 512)
    private String userAgent;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(nullable = false)
    private Instant updatedAt = Instant.now();

    protected Enquiry() {
        // for JPA
    }

    public Enquiry(String referenceNo, EnquiryType type, String contactName,
                   String email, String country) {
        this.referenceNo = referenceNo;
        this.type = type;
        this.contactName = contactName;
        this.email = email;
        this.country = country;
    }

    /**
     * Move to the next status, refusing transitions the flow does not allow.
     *
     * Enforced here rather than in the controller so every path into the
     * domain — admin action, future automation, a test — gets the same rule.
     */
    public void updateStatus(EnquiryStatus next) {
        if (!status.canTransitionTo(next)) {
            throw new IllegalStateException(
                "Cannot move enquiry %s from %s to %s".formatted(referenceNo, status, next));
        }
        status = next;
    }

    @PreUpdate
    void touch() {
        updatedAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getReferenceNo() { return referenceNo; }
    public EnquiryType getType() { return type; }
    public EnquiryStatus getStatus() { return status; }
    public String getCompanyName() { return companyName; }
    public String getContactName() { return contactName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getCountry() { return country; }
    public String getCity() { return city; }
    public String getMessage() { return message; }
    public String getLocale() { return locale; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setCity(String city) { this.city = city; }
    public void setMessage(String message) { this.message = message; }
    public void setLocale(String locale) { this.locale = locale; }
    public void setSourceIp(String sourceIp) { this.sourceIp = sourceIp; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
}
