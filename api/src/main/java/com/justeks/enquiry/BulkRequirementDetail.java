package com.justeks.enquiry;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

/** What a bulk order enquiry asks beyond the shared fields. */
@Entity
@Table(name = "bulk_requirement_detail")
public class BulkRequirementDetail {

    @Id
    @Column(name = "enquiry_id")
    private Long enquiryId;

    private String articleOrFabric;
    private String composition;
    private String colour;
    private String gsm;
    private String width;
    private String requiredQuantity;
    private LocalDate requiredDeliveryDate;
    private String deliveryCountry;
    private String deliveryCity;
    private String productionApplication;

    protected BulkRequirementDetail() {
    }

    public BulkRequirementDetail(Long enquiryId) {
        this.enquiryId = enquiryId;
    }

    public Long getEnquiryId() { return enquiryId; }
    public String getArticleOrFabric() { return articleOrFabric; }
    public String getComposition() { return composition; }
    public String getColour() { return colour; }
    public String getGsm() { return gsm; }
    public String getWidth() { return width; }
    public String getRequiredQuantity() { return requiredQuantity; }
    public LocalDate getRequiredDeliveryDate() { return requiredDeliveryDate; }
    public String getDeliveryCountry() { return deliveryCountry; }
    public String getDeliveryCity() { return deliveryCity; }
    public String getProductionApplication() { return productionApplication; }

    public void setArticleOrFabric(String v) { this.articleOrFabric = v; }
    public void setComposition(String v) { this.composition = v; }
    public void setColour(String v) { this.colour = v; }
    public void setGsm(String v) { this.gsm = v; }
    public void setWidth(String v) { this.width = v; }
    public void setRequiredQuantity(String v) { this.requiredQuantity = v; }
    public void setRequiredDeliveryDate(LocalDate v) { this.requiredDeliveryDate = v; }
    public void setDeliveryCountry(String v) { this.deliveryCountry = v; }
    public void setDeliveryCity(String v) { this.deliveryCity = v; }
    public void setProductionApplication(String v) { this.productionApplication = v; }
}
