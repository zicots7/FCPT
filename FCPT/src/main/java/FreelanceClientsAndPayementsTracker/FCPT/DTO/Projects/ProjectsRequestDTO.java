package FreelanceClientsAndPayementsTracker.FCPT.DTO.Projects;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Status;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public record ProjectsRequestDTO(
        @NotBlank
        String title,
        @NotBlank
        String description,
        LocalDateTime startDate,
        LocalDateTime deadline,
        Status status,
        Long totalValue,
        Long clientId


){}
