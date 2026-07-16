package FreelanceClientsAndPayementsTracker.FCPT.Service.Invoice;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Clients.ClientsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Projects.ProjectsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Invoice.InvoiceRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final ProjectsRepository projectsRepository;
    private final ClientsRepository clientsRepository;
    private final PdfServiceClient pdfService;

    public byte[] generateInvoiceForProject(Long projectId) {

        // 1. Fetch data from your database (PostgreSQL/JPA)
        Projects project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // 2. Fetch Client (using the ID from the Project)
        Clients client = clientsRepository.findById(project.getClient().getId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        // 3. MANUAL MAPPING: This is where you fix the nulls!
        InvoiceRequestDTO dto = new InvoiceRequestDTO(
                client.getFirstName() + " " + client.getLastName(),
                project.getTotalValue().intValue(),
                project.getDescription(),
                project.getTitle(),                                 // Mapping Project Name
                project.getDeadline().toString()                              // Mapping Date
        );

        // 4. Send the populated DTO
        return pdfService.generatePdf(dto);
    }
}
