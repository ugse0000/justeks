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
@RequestMapping("/api/v1/enquiries")
public class EnquiryController {

    private final EnquiryService service;

    public EnquiryController(EnquiryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EnquiryCreatedResponse> create(
        @Valid @RequestBody CreateEnquiryRequest request,
        HttpServletRequest http) {

        var reference = service.submit(request, RequestContexts.from(http));

        // A discarded honeypot submission gets the same 201 as a real one, with
        // no reference - the sender is a bot and learns nothing from the reply.
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new EnquiryCreatedResponse(reference.orElse(null)));
    }
}
