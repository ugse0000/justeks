package com.justeks.enquiry;

import com.justeks.storage.StoredFile;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/** A file attached to an enquiry. The bytes live in storage, not here. */
@Entity
@Table(name = "enquiry_attachment")
public class EnquiryAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enquiry_id", nullable = false)
    private Long enquiryId;

    @Column(nullable = false)
    private String originalFilename;

    /** The storage key: a UUID, never the sender's filename. */
    @Column(nullable = false, unique = true)
    private String storedKey;

    @Column(nullable = false, length = 128)
    private String contentType;

    @Column(nullable = false)
    private long sizeBytes;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected EnquiryAttachment() {
    }

    public EnquiryAttachment(Long enquiryId, StoredFile file) {
        this.enquiryId = enquiryId;
        this.originalFilename = file.originalFilename();
        this.storedKey = file.key();
        this.contentType = file.contentType();
        this.sizeBytes = file.sizeBytes();
    }

    public Long getId() { return id; }
    public Long getEnquiryId() { return enquiryId; }
    public String getOriginalFilename() { return originalFilename; }
    public String getStoredKey() { return storedKey; }
    public String getContentType() { return contentType; }
    public long getSizeBytes() { return sizeBytes; }
    public Instant getCreatedAt() { return createdAt; }
}
