package FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Payment.PaymentResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.PaidStatus;
import java.time.LocalDateTime;
import java.util.List;

public record MilestoneResponseDTO(
        Long id,
        String description,
        Long amount,
        LocalDateTime dueDate,
        PaidStatus isPaid,
        Long projectNameId
){}
