package FreelanceClientsAndPayementsTracker.FCPT.Controller.Invoice;
import FreelanceClientsAndPayementsTracker.FCPT.Service.Invoice.InvoiceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/FCPT")
public class InvoiceController {

    private final InvoiceService invoiceService;
    @PreAuthorize("hasAuthority('admin') or hasAuthority('client')")
    @GetMapping("/download-invoice/{projectId}")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable Long projectId) {
        // Orchestrate: Fetch data -> Generate PDF -> Deliver
        byte[] pdfBytes = invoiceService.generateInvoiceForProject(projectId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"project_" + projectId + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}

