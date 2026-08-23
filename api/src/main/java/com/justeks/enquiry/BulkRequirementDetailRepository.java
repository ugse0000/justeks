package com.justeks.enquiry;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BulkRequirementDetailRepository extends JpaRepository<BulkRequirementDetail, Long> {

    Optional<BulkRequirementDetail> findByEnquiryId(Long enquiryId);
}
