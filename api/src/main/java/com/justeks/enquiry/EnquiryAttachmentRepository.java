package com.justeks.enquiry;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnquiryAttachmentRepository extends JpaRepository<EnquiryAttachment, Long> {

    List<EnquiryAttachment> findByEnquiryId(Long enquiryId);

    Optional<EnquiryAttachment> findByStoredKey(String storedKey);
}
