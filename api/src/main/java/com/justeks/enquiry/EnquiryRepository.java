package com.justeks.enquiry;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    Optional<Enquiry> findByReferenceNo(String referenceNo);

    Page<Enquiry> findByStatus(EnquiryStatus status, Pageable pageable);

    Page<Enquiry> findByType(EnquiryType type, Pageable pageable);

    Page<Enquiry> findByStatusAndType(EnquiryStatus status, EnquiryType type, Pageable pageable);
}
