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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;
import java.time.Duration;
import java.util.List;


@Service
@AllArgsConstructor
public class ProjectsService {
    private final ProjectsRepository projectsRepository;
    private final ClientsRepository clientsRepository;
    private final ProjectMapper projectMapper;
    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    @Transactional
    public ProjectsResponseDTO createProject(ProjectsRequestDTO request){
        Clients client = clientsRepository.findById(request.clientId())
                .orElseThrow(()-> new ResourceNotFoundException("Client "+ request.clientId() + "does not exist"));
        Projects projects = Projects.builder()
                .title(request.title())
                .description(request.description())
                .status(request.Status())
                .client(client)
                .startDate(request.startDate())
                .deadline(request.deadline())
                .totalValue(request.totalValue())
                .build();
        redisTemplate.delete("project:client:" + projects.getClient().getId());
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
        projects.setStatus(request.Status());
        projects.setStartDate(request.startDate());
        projects.setDeadline(request.deadline());
        projects.setTotalValue(request.totalValue());
        redisTemplate.delete("project:client:" + projects.getClient().getId());
        return projectMapper.toResponse(projectsRepository.save(projects));
    }
    @Transactional
    public void deleteProject(Long id){
        Projects project= projectsRepository.findByPid(id).orElseThrow(()-> new ResourceNotFoundException("Project does not exist !"));
            projectsRepository.deleteByPid(project.getPid());
            redisTemplate.delete("project:client:" + project.getClient().getId());
            redisTemplate.delete("project:milestone:" + id);
            redisTemplate.delete("payment:project:" + id);

    }
    public List<ProjectsResponseDTO> getProject(Long id){
        String key= "project:client:" +id;
        Object cached = redisTemplate.opsForValue().get(key);

        if(cached!=null){

            return objectMapper.convertValue(
                    cached, new TypeReference<List<ProjectsResponseDTO>>(){}
            );
        }else {

            List<ProjectsResponseDTO> projects =
                    projectsRepository.findByClientId(id)
                            .stream()
                            .map(projectMapper::toResponse)
                            .toList();


        redisTemplate.opsForValue()
                .set(key, projects, Duration.ofMinutes(5));

        return projects;}
    }

    public List<ProjectsResponseDTO> getProjects(){

        return projectsRepository.findAll().stream()
                .map(projectMapper::toResponse)
                .toList();
    }
}
