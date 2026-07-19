package FreelanceClientsAndPayementsTracker.FCPT.Service.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Milestone.MilestoneRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Projects.ProjectsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone.MilestoneRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone.MilestoneResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.PaidStatus;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.mapper.MilestoneMapper;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.Payment;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;
import java.util.List;

@Service
@AllArgsConstructor
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private  final ProjectsRepository projectsRepository;
    private final MilestoneMapper milestoneMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public List<MilestoneResponseDTO> getMilestone(Long pid) {
        String key= "project:milestone:" + pid;
        Object cached = redisTemplate.opsForValue().get(key);
        if(cached!=null){
            return objectMapper.convertValue(cached, new TypeReference<List<MilestoneResponseDTO>>() {
            });

        }else{
        List<MilestoneResponseDTO>milestones=milestoneRepository.findAllByProjectPid(pid).stream()
                .map(milestoneMapper::toResponse).toList();
        redisTemplate.opsForValue().set(key,milestones, Duration.ofMinutes(5));
        return milestones;}
    }

    public List<MilestoneResponseDTO> getMilestones() {
        return milestoneRepository.findAll().stream()
                .map(milestoneMapper::toResponse).toList();
    }

    @Transactional
    public MilestoneResponseDTO createMilestone(@Valid MilestoneRequestDTO request) {
        Projects projects = projectsRepository.getReferenceById(request.projectNameId());
        Milestone milestone = Milestone.builder()
                .description(request.description())
                .isPaid(request.isPaid())
                .dueDate(request.dueDate())
                .amount(request.amount())
                .project(projects)
                .build();

        if (request.isPaid() == PaidStatus.Yes) {
            projects.setTotalValue(projects.getTotalValue() - milestone.getAmount());
            projectsRepository.save(projects);
        }

        return milestoneMapper.toResponse(milestoneRepository.save(milestone));
    }

    @Transactional
    public MilestoneResponseDTO updateMilestone(Long id, @Valid MilestoneRequestDTO request) {

        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Milestone does not exist"));
        Projects projects = milestone.getProject();
        // 1. Capture the OLD status BEFORE changing it
        PaidStatus oldStatus = milestone.getIsPaid();
        PaidStatus newStatus = request.isPaid();
        String key = "project:milestone:" + projects.getPid();
        // 2. Logic to update Project total ONLY if status changed
        if (oldStatus != newStatus) {
            if (newStatus == PaidStatus.Yes) {
                // Became Paid: Subtract from project total
                projects.setTotalValue(projects.getTotalValue() - milestone.getAmount());
            } else {
                // Became Unpaid: Add back to project total
                projects.setTotalValue(projects.getTotalValue() + milestone.getAmount());
            }
            projectsRepository.save(projects);
        }
        // Apply other updates
        redisTemplate.delete(key);
        milestone.setAmount(request.amount());
        milestone.setDescription(request.description());
        milestone.setProject(projects);
        milestone.setDueDate(request.dueDate());
        milestone.setIsPaid(request.isPaid());
        return milestoneMapper.toResponse(milestoneRepository.save(milestone));
    }
    @Transactional
    public void deleteMilestone(Long id) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Milestone does not exist"));

        Long projectId = milestone
                .getProject()
                .getPid();
        milestoneRepository.deleteById(milestone.getId());
        redisTemplate.delete("project:milestone:" + projectId);
    }
}
