package com.justeks.enquiry;

import com.justeks.enquiry.EnquiryService.RequestContext;
import com.justeks.notification.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * The two forms with no attachments.
 *
 * They differ only in which detail row they write, so they share a class
 * rather than duplicating the enquiry-and-notify sequence twice.
 */
@Service
public class BulkAndTradeAccountService {

    private static final Logger log = LoggerFactory.getLogger(BulkAndTradeAccountService.class);

    private final EnquiryRepository enquiries;
    private final BulkRequirementDetailRepository bulkDetails;
    private final TradeAccountDetailRepository tradeAccountDetails;
    private final EnquiryFactory factory;
    private final NotificationService notifications;

    public BulkAndTradeAccountService(EnquiryRepository enquiries,
                                      BulkRequirementDetailRepository bulkDetails,
                                      TradeAccountDetailRepository tradeAccountDetails,
                                      EnquiryFactory factory,
                                      NotificationService notifications) {
        this.enquiries = enquiries;
        this.bulkDetails = bulkDetails;
        this.tradeAccountDetails = tradeAccountDetails;
        this.factory = factory;
        this.notifications = notifications;
    }

    @Transactional
    public Optional<String> submitBulk(CreateBulkRequirement request, RequestContext context) {
        if (request.looksAutomated()) {
            log.debug("Honeypot filled; bulk requirement discarded");
            return Optional.empty();
        }

        var saved = enquiries.save(factory.create(request, EnquiryType.BULK, context));

        var detail = new BulkRequirementDetail(saved.getId());
        detail.setArticleOrFabric(request.articleOrFabric());
        detail.setComposition(request.composition());
        detail.setColour(request.colour());
        detail.setGsm(request.gsm());
        detail.setWidth(request.width());
        detail.setRequiredQuantity(request.requiredQuantity());
        detail.setRequiredDeliveryDate(request.requiredDeliveryDate());
        detail.setDeliveryCountry(request.deliveryCountry());
        detail.setDeliveryCity(request.deliveryCity());
        detail.setProductionApplication(request.productionApplication());
        bulkDetails.save(detail);

        notifications.enquiryReceived(saved);
        return Optional.of(saved.getReferenceNo());
    }

    @Transactional
    public Optional<String> submitTradeAccount(CreateTradeAccountApplication request,
                                               RequestContext context) {
        if (request.looksAutomated()) {
            log.debug("Honeypot filled; trade account application discarded");
            return Optional.empty();
        }

        var saved = enquiries.save(factory.create(request, EnquiryType.TRADE_ACCOUNT, context));

        var detail = new TradeAccountDetail(saved.getId());
        detail.setCompanyRegistration(request.companyRegistration());
        detail.setVatNumber(request.vatNumber());
        detail.setBusinessType(request.businessType());
        detail.setCompanyWebsite(request.companyWebsite());
        detail.setAnnualVolumeEstimate(request.annualVolumeEstimate());
        tradeAccountDetails.save(detail);

        notifications.enquiryReceived(saved);
        return Optional.of(saved.getReferenceNo());
    }
}
