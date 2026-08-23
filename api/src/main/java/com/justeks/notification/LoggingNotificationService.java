package com.justeks.notification;

import com.justeks.enquiry.Enquiry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Phase 1 notifier: writes a line to the log.
 *
 * Deliberately logs the reference, type and country but not the message body,
 * the email address or the phone number — application logs are the wrong place
 * for a buyer's contact details.
 */
@Service
public class LoggingNotificationService implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(LoggingNotificationService.class);

    @Override
    public void enquiryReceived(Enquiry enquiry) {
        log.info("Enquiry {} received: type={} country={}",
            enquiry.getReferenceNo(), enquiry.getType(), enquiry.getCountry());
    }
}
