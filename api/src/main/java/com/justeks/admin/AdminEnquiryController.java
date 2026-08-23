package com.justeks.admin;

import com.justeks.enquiry.Enquiry;
import com.justeks.enquiry.EnquiryAttachmentRepository;
import com.justeks.enquiry.EnquiryRepository;
import com.justeks.enquiry.EnquiryStatus;
import com.justeks.enquiry.EnquiryType;
import com.justeks.storage.StorageService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/v1/admin/enquiries")
public class AdminEnquiryController {

    private final EnquiryRepository enquiries;
    private final EnquiryAttachmentRepository attachments;
    private final StorageService storage;

    public AdminEnquiryController(EnquiryRepository enquiries,
                                  EnquiryAttachmentRepository attachments,
                                  StorageService storage) {
        this.enquiries = enquiries;
        this.attachments = attachments;
        this.storage = storage;
    }

    /** Newest first, optionally narrowed by status and type. */
    @GetMapping
    public Page<AdminEnquiryView> list(
        @RequestParam(required = false) EnquiryStatus status,
        @RequestParam(required = false) EnquiryType type,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "25") int size) {

        var pageable = PageRequest.of(page, Math.min(size, 100),
            Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Enquiry> found;
        if (status != null && type != null) {
            found = enquiries.findByStatusAndType(status, type, pageable);
        } else if (status != null) {
            found = enquiries.findByStatus(status, pageable);
        } else if (type != null) {
            found = enquiries.findByType(type, pageable);
        } else {
            found = enquiries.findAll(pageable);
        }
        return found.map(AdminEnquiryView::summary);
    }

    @GetMapping("/{reference}")
    public AdminEnquiryView detail(@PathVariable String reference) {
        var enquiry = require(reference);
        var files = attachments.findByEnquiryId(enquiry.getId()).stream()
            .map(a -> new AdminEnquiryView.AttachmentView(
                a.getStoredKey(), a.getOriginalFilename(), a.getContentType(), a.getSizeBytes()))
            .toList();
        return AdminEnquiryView.of(enquiry, files);
    }

    /**
     * Move an enquiry along its status flow.
     *
     * An invalid transition raises IllegalStateException in the domain, which
     * the exception handler turns into 409 — the request was well-formed, the
     * state just does not permit it.
     */
    @PatchMapping("/{reference}/status")
    @Transactional
    public AdminEnquiryView updateStatus(@PathVariable String reference,
                                         @Valid @RequestBody UpdateStatusRequest request) {
        var enquiry = require(reference);
        enquiry.updateStatus(request.status());
        return AdminEnquiryView.summary(enquiries.save(enquiry));
    }

    /**
     * Serve an attachment.
     *
     * The key is looked up against the enquiry it belongs to, so a valid key
     * for one enquiry cannot be fetched through another's URL. The content type
     * is the one recorded at upload, and the disposition is always attachment —
     * nothing uploaded here is ever rendered in the browser.
     */
    @GetMapping("/{reference}/attachments/{key}")
    public ResponseEntity<org.springframework.core.io.Resource> download(
        @PathVariable String reference, @PathVariable String key) {

        var enquiry = require(reference);
        var attachment = attachments.findByStoredKey(key)
            .filter(a -> a.getEnquiryId().equals(enquiry.getId()))
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Attachment not found"));

        var disposition = ContentDisposition.attachment()
            .filename(attachment.getOriginalFilename())
            .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
            .contentType(MediaType.parseMediaType(attachment.getContentType()))
            .body(storage.load(attachment.getStoredKey()));
    }

    private Enquiry require(String reference) {
        return enquiries.findByReferenceNo(reference)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Enquiry not found"));
    }

    /** Values the admin UI needs to build its filters. */
    @GetMapping("/meta")
    public java.util.Map<String, List<String>> meta() {
        return java.util.Map.of(
            "statuses", java.util.Arrays.stream(EnquiryStatus.values()).map(Enum::name).toList(),
            "types", java.util.Arrays.stream(EnquiryType.values()).map(Enum::name).toList());
    }
}
