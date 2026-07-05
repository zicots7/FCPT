package FreelanceClientsAndPayementsTracker.FCPT.Service.Invoice;

import FreelanceClientsAndPayementsTracker.FCPT.DTO.Invoice.InvoiceRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PdfService {
    private final PdfServiceClient pdfClient;
    public byte[] createInvoicePdf(InvoiceRequestDTO data) {

        return pdfClient.generatePdf(data);
    }
}

