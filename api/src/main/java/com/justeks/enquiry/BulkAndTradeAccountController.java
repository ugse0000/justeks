package com.justeks.enquiry;

import com.justeks.common.RequestContexts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class BulkAndTradeAccountController {

    private final BulkAndTradeAccountService service;

    public BulkAndTradeAccountController(BulkAndTradeAccountService service) {
        this.service = service;
    }

    @PostMapping("/bulk-requirements")
    public ResponseEntity<EnquiryCreatedResponse> bulk(
        @Valid @RequestBody CreateBulkRequirement request, HttpServletRequest http) {

        var reference = service.submitBulk(request, RequestContexts.from(http));
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new EnquiryCreatedResponse(reference.orElse(null)));
    }

    @PostMapping("/trade-account-applications")
    public ResponseEntity<EnquiryCreatedResponse> tradeAccount(
        @Valid @RequestBody CreateTradeAccountApplication request, HttpServletRequest http) {

        var reference = service.submitTradeAccount(request, RequestContexts.from(http));
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new EnquiryCreatedResponse(reference.orElse(null)));
    }
}
