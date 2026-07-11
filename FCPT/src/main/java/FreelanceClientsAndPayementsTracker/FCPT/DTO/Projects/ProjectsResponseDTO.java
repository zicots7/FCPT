package FreelanceClientsAndPayementsTracker.FCPT.DTO.Projects;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Status;

import java.time.LocalDateTime;

public record ProjectsResponseDTO(
        Long pid,
        String title,
        String description,
        LocalDateTime startDate,
        LocalDateTime deadline,
        Status Status,
        Long totalValue,
        String client,
        Long clientId

) {
}
