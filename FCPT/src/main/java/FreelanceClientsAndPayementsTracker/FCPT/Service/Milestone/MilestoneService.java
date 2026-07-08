package FreelanceClientsAndPayementsTracker.FCPT.Service.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Milestone.MilestoneRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Projects.ProjectsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone.MilestoneRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone.MilestoneResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.PaidStatus;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.mapper.MilestoneMapper;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private  final ProjectsRepository projectsRepository;
    private final MilestoneMapper milestoneMapper;
    
    public List<MilestoneResponseDTO> getMilestone(Long pid) {

        return milestoneRepository.findAllByProjectPid(pid).stream()
                .map(milestoneMapper::toResponse).toList();
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
        milestoneRepository.deleteById(milestone.getId());
    }
}
