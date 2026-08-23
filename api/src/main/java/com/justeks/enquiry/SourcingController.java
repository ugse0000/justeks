package com.justeks.enquiry;

import com.justeks.common.RequestContexts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sourcing-requests")
public class SourcingController {

    private final SourcingService service;

    public SourcingController(SourcingService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EnquiryCreatedResponse> create(
        @Valid @ModelAttribute CreateSourcingRequest request,
        @RequestPart(value = "files", required = false) List<MultipartFile> files,
        HttpServletRequest http) {

        var reference = service.submit(request, files, RequestContexts.from(http));

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new EnquiryCreatedResponse(reference.orElse(null)));
    }
}
