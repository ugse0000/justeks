package com.justeks.enquiry;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * What a trade account application asks beyond the shared fields.
 *
 * The column is `website` to match the schema, but the form field is
 * companyWebsite: `website` is already taken by the honeypot every form
 * carries, and two different meanings under one name is how a real
 * applicant's site ends up treated as spam.
 */
@Entity
@Table(name = "trade_account_detail")
public class TradeAccountDetail {

    @Id
    @Column(name = "enquiry_id")
    private Long enquiryId;

    private String companyRegistration;
    private String vatNumber;
    private String businessType;

    @Column(name = "website")
    private String companyWebsite;

    private String annualVolumeEstimate;

    protected TradeAccountDetail() {
    }

    public TradeAccountDetail(Long enquiryId) {
        this.enquiryId = enquiryId;
    }

    public Long getEnquiryId() { return enquiryId; }
    public String getCompanyRegistration() { return companyRegistration; }
    public String getVatNumber() { return vatNumber; }
    public String getBusinessType() { return businessType; }
    public String getCompanyWebsite() { return companyWebsite; }
    public String getAnnualVolumeEstimate() { return annualVolumeEstimate; }

    public void setCompanyRegistration(String v) { this.companyRegistration = v; }
    public void setVatNumber(String v) { this.vatNumber = v; }
    public void setBusinessType(String v) { this.businessType = v; }
    public void setCompanyWebsite(String v) { this.companyWebsite = v; }
    public void setAnnualVolumeEstimate(String v) { this.annualVolumeEstimate = v; }
}
