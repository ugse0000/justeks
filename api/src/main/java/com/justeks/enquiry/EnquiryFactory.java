package com.justeks.enquiry;

import com.justeks.common.ReferenceNumberGenerator;
import com.justeks.enquiry.EnquiryService.RequestContext;
import org.springframework.stereotype.Component;

import java.time.Year;

/** Builds the shared Enquiry row from whichever form was submitted. */
@Component
public class EnquiryFactory {

    private final ReferenceNumberGenerator references;

    public EnquiryFactory(ReferenceNumberGenerator references) {
        this.references = references;
    }

    public Enquiry create(EnquiryFields fields, EnquiryType type, RequestContext context) {
        var enquiry = new Enquiry(
            references.next(type, Year.now().getValue()),
            type,
            fields.contactName(),
            fields.email(),
            fields.country());

        enquiry.setCompanyName(fields.companyName());
        enquiry.setPhone(fields.phone());
        enquiry.setCity(fields.city());
        enquiry.setMessage(fields.message());
        enquiry.setLocale(fields.locale());
        enquiry.setSourceIp(context.sourceIp());
        enquiry.setUserAgent(context.userAgent());
        return enquiry;
    }
}
