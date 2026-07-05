package FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.mapper;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone.MilestoneResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.Milestone;
import org.springframework.stereotype.Component;


@Component
public class MilestoneMapper {
    public MilestoneResponseDTO toResponse(Milestone milestone){
        return new MilestoneResponseDTO(
                milestone.getId(),
                milestone.getDescription(),
                milestone.getAmount(),
                milestone.getDueDate(),
                milestone.getIsPaid(),
                milestone.getProject().getPid()
        );
    }

}
