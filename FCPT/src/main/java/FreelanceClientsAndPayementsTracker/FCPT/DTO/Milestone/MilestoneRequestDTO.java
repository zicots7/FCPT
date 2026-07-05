package FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.PaidStatus;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import java.time.LocalDateTime;
public record MilestoneRequestDTO (
        Long id,
        String description,
        Long amount,
        LocalDateTime dueDate,
        PaidStatus isPaid,
        Long projectNameId
){}
