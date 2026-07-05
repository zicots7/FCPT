package FreelanceClientsAndPayementsTracker.FCPT.Service.Invoice;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Invoice.InvoiceRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "pdf-service", url = "${pdf.service.url}")
public interface PdfServiceClient {
    @PostMapping(value = "/downloadPdf", consumes = "application/json", produces = "application/pdf")
    byte[] generatePdf(@RequestBody InvoiceRequestDTO data);
}
