package com.justeks.enquiry;

import com.justeks.common.ReferenceNumberGenerator;
import com.justeks.enquiry.EnquiryService.RequestContext;
import com.justeks.notification.NotificationService;
import com.justeks.storage.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Year;
import java.util.List;
import java.util.Optional;

@Service
public class SourcingService {

    private static final Logger log = LoggerFactory.getLogger(SourcingService.class);

    private final EnquiryRepository enquiries;
    private final SourcingRequestDetailRepository details;
    private final EnquiryAttachmentRepository attachments;
    private final ReferenceNumberGenerator references;
    private final StorageService storage;
    private final NotificationService notifications;

    public SourcingService(EnquiryRepository enquiries,
                           SourcingRequestDetailRepository details,
                           EnquiryAttachmentRepository attachments,
                           ReferenceNumberGenerator references,
                           StorageService storage,
                           NotificationService notifications) {
        this.enquiries = enquiries;
        this.details = details;
        this.attachments = attachments;
        this.references = references;
        this.storage = storage;
        this.notifications = notifications;
    }

    /**
     * Record a sourcing request with its attachments.
     *
     * Files are written before the transaction commits, so if the database work
     * fails the bytes would outlive the enquiry that explains them. The catch
     * removes them before rethrowing, which keeps the upload directory free of
     * files no row points at.
     */
    @Transactional
    public Optional<String> submit(CreateSourcingRequest request,
                                   List<MultipartFile> files,
                                   RequestContext context) {
        if (request.looksAutomated()) {
            log.debug("Honeypot filled; sourcing request discarded");
            return Optional.empty();
        }

        var stored = storage.storeAll(files);
        try {
            var enquiry = new Enquiry(
                references.next(EnquiryType.SOURCING, Year.now().getValue()),
                EnquiryType.SOURCING,
                request.contactName(), request.email(), request.country());

            enquiry.setCompanyName(request.companyName());
            enquiry.setPhone(request.phone());
            enquiry.setCity(request.city());
            enquiry.setMessage(request.message());
            enquiry.setLocale(request.locale());
            enquiry.setSourceIp(context.sourceIp());
            enquiry.setUserAgent(context.userAgent());

            var saved = enquiries.save(enquiry);

            var detail = new SourcingRequestDetail(saved.getId());
            detail.setFabricType(request.fabricType());
            detail.setComposition(request.composition());
            detail.setGsm(request.gsm());
            detail.setWidth(request.width());
            detail.setColour(request.colour());
            detail.setApplication(request.application());
            detail.setRequiredQuantity(request.requiredQuantity());
            detail.setDeliveryCountry(request.deliveryCountry());
            detail.setRequiredDate(request.requiredDate());
            details.save(detail);

            stored.forEach(file -> attachments.save(new EnquiryAttachment(saved.getId(), file)));

            notifications.enquiryReceived(saved);
            return Optional.of(saved.getReferenceNo());

        } catch (RuntimeException e) {
            stored.forEach(file -> storage.delete(file.key()));
            throw e;
        }
    }
}
