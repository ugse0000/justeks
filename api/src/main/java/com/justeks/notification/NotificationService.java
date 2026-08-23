package com.justeks.notification;

import com.justeks.enquiry.Enquiry;

/**
 * Tells the team an enquiry has arrived.
 *
 * Phase 1 logs. Wiring SMTP later means adding an implementation, not changing
 * any caller.
 */
public interface NotificationService {

    void enquiryReceived(Enquiry enquiry);
}
