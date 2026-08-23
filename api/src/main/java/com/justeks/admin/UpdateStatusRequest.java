package com.justeks.admin;

import com.justeks.enquiry.EnquiryStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(@NotNull EnquiryStatus status) {
}
