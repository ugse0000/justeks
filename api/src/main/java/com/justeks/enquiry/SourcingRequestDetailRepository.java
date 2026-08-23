package com.justeks.enquiry;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SourcingRequestDetailRepository extends JpaRepository<SourcingRequestDetail, Long> {

    Optional<SourcingRequestDetail> findByEnquiryId(Long enquiryId);
}
