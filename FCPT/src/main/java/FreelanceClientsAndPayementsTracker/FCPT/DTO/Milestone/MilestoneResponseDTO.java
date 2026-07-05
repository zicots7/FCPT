package FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.PaidStatus;
import java.time.LocalDateTime;

public record MilestoneResponseDTO(
        Long id,
        String description,
        Long amount,
        LocalDateTime dueDate,
        PaidStatus isPaid,
        Long projectNameId
){}
