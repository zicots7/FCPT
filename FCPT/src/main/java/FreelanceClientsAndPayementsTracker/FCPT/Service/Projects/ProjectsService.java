package FreelanceClientsAndPayementsTracker.FCPT.Service.Projects;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Clients.ClientsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Projects.ProjectsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Projects.ProjectsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Projects.ProjectsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.mapper.ProjectMapper;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectsService {
    private final ProjectsRepository projectsRepository;
    private final ClientsRepository clientsRepository;
    private final ProjectMapper projectMapper;

    @Transactional
    public ProjectsResponseDTO createProject(ProjectsRequestDTO request){
        Clients client = clientsRepository.findById(request.clientId())
                .orElseThrow(()-> new ResourceNotFoundException("Client "+ request.clientId() + "does not exist"));
        Projects projects = Projects.builder()
                .title(request.title())
                .description(request.description())
                .status(request.status())
                .client(client)
                .startDate(request.startDate())
                .deadline(request.deadline())
                .totalValue(request.totalValue())
                .build();
        return projectMapper.toResponse(projectsRepository.save(projects));
    }
    @Transactional
    public ProjectsResponseDTO updateProject(Long id,ProjectsRequestDTO request){
        Projects projects = projectsRepository.findByPid(id)
                .orElseThrow(()-> new ResourceNotFoundException("Project not found"));
        Clients newClient = clientsRepository.findById(request.clientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        projects.setTitle(request.title());
        projects.setClient(newClient);
        projects.setDescription(request.description());
        projects.setStatus(request.status());
        projects.setStartDate(request.startDate());
        projects.setDeadline(request.deadline());
        projects.setTotalValue(request.totalValue());
        return projectMapper.toResponse(projectsRepository.save(projects));
    }
    @Transactional
    public void deleteProject(Long id){
        if(projectsRepository.existsByPid(id)){
            projectsRepository.deleteByPid(id);
        }
    }
    public List<ProjectsResponseDTO> getProject(Long id){
        return projectsRepository.findByClientId(id).stream()
                .map(projectMapper::toResponse)
                .toList();

    }

    public List<ProjectsResponseDTO> getProjects(){
        return projectsRepository.findAll().stream()
                .map(projectMapper::toResponse)
                .toList();
    }
}
