package com.justeks.common;

import com.justeks.enquiry.EnquiryService.RequestContext;
import jakarta.servlet.http.HttpServletRequest;

public final class RequestContexts {

    private RequestContexts() {
    }

    /**
     * Pull the caller's address and client string off the request.
     *
     * X-Forwarded-For is read because the app sits behind a proxy in every
     * deployment we plan; its first entry is the original client. It is
     * attacker-controlled, so it is only ever stored for investigation and
     * never used for an access decision.
     */
    public static RequestContext from(HttpServletRequest request) {
        var forwarded = request.getHeader("X-Forwarded-For");
        var ip = (forwarded != null && !forwarded.isBlank())
            ? forwarded.split(",")[0].trim()
            : request.getRemoteAddr();

        return new RequestContext(truncate(ip, 45), truncate(request.getHeader("User-Agent"), 512));
    }

    private static String truncate(String value, int max) {
        if (value == null) {
            return null;
        }
        return value.length() <= max ? value : value.substring(0, max);
    }
}
