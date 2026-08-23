package com.justeks.enquiry;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

/**
 * What a sourcing request asks beyond the shared enquiry fields.
 *
 * GSM, width and quantity are free text: buyers write "160-180",
 * "approx 150cm", "2000m / colour". Forcing numbers here would either reject
 * real requests or quietly lose what they meant.
 */
@Entity
@Table(name = "sourcing_request_detail")
public class SourcingRequestDetail {

    @Id
    @Column(name = "enquiry_id")
    private Long enquiryId;

    private String fabricType;
    private String composition;
    private String gsm;
    private String width;
    private String colour;
    private String application;
    private String requiredQuantity;
    private String deliveryCountry;
    private LocalDate requiredDate;

    protected SourcingRequestDetail() {
    }

    public SourcingRequestDetail(Long enquiryId) {
        this.enquiryId = enquiryId;
    }

    public Long getEnquiryId() { return enquiryId; }
    public String getFabricType() { return fabricType; }
    public String getComposition() { return composition; }
    public String getGsm() { return gsm; }
    public String getWidth() { return width; }
    public String getColour() { return colour; }
    public String getApplication() { return application; }
    public String getRequiredQuantity() { return requiredQuantity; }
    public String getDeliveryCountry() { return deliveryCountry; }
    public LocalDate getRequiredDate() { return requiredDate; }

    public void setFabricType(String v) { this.fabricType = v; }
    public void setComposition(String v) { this.composition = v; }
    public void setGsm(String v) { this.gsm = v; }
    public void setWidth(String v) { this.width = v; }
    public void setColour(String v) { this.colour = v; }
    public void setApplication(String v) { this.application = v; }
    public void setRequiredQuantity(String v) { this.requiredQuantity = v; }
    public void setDeliveryCountry(String v) { this.deliveryCountry = v; }
    public void setRequiredDate(LocalDate v) { this.requiredDate = v; }
}
