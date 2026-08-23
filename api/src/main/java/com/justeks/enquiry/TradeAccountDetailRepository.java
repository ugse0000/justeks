package com.justeks.enquiry;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TradeAccountDetailRepository extends JpaRepository<TradeAccountDetail, Long> {

    Optional<TradeAccountDetail> findByEnquiryId(Long enquiryId);
}
