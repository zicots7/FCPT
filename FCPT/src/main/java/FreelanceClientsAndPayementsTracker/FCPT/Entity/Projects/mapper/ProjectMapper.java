package FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.mapper;

import FreelanceClientsAndPayementsTracker.FCPT.DTO.Projects.ProjectsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {
public ProjectsResponseDTO toResponse(Projects projects){
    return new ProjectsResponseDTO(
            projects.getPid(),
            projects.getTitle(),
            projects.getDescription(),
            projects.getStartDate(),
            projects.getDeadline(),
            projects.getStatus(),
            projects.getTotalValue(),
            projects.getClient().getId()
    );
}
}
