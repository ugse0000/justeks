package com.justeks.enquiry;

import com.justeks.common.ReferenceNumberGenerator;
import com.justeks.notification.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.Optional;

@Service
public class EnquiryService {

    private static final Logger log = LoggerFactory.getLogger(EnquiryService.class);

    private final EnquiryRepository repository;
    private final ReferenceNumberGenerator references;
    private final NotificationService notifications;

    public EnquiryService(EnquiryRepository repository,
                          ReferenceNumberGenerator references,
                          NotificationService notifications) {
        this.repository = repository;
        this.references = references;
        this.notifications = notifications;
    }

    /**
     * Record an enquiry and return its reference.
     *
     * Returns empty when the submission looks automated. The caller still
     * answers 201: telling a bot that its honeypot was detected just teaches
     * whoever wrote it to stop filling the field in.
     */
    @Transactional
    public Optional<String> submit(CreateEnquiryRequest request, RequestContext context) {
        if (request.looksAutomated()) {
            log.debug("Honeypot filled; enquiry discarded");
            return Optional.empty();
        }

        var enquiry = new Enquiry(
            references.next(request.type(), Year.now().getValue()),
            request.type(),
            request.contactName(),
            request.email(),
            request.country());

        enquiry.setCompanyName(request.companyName());
        enquiry.setPhone(request.phone());
        enquiry.setCity(request.city());
        enquiry.setMessage(request.message());
        enquiry.setLocale(request.locale());
        enquiry.setSourceIp(context.sourceIp());
        enquiry.setUserAgent(context.userAgent());

        var saved = repository.save(enquiry);
        notifications.enquiryReceived(saved);

        return Optional.of(saved.getReferenceNo());
    }

    /** What we keep about the request itself, for abuse investigation. */
    public record RequestContext(String sourceIp, String userAgent) {
    }
}
