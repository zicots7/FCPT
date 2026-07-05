package FreelanceClientsAndPayementsTracker.FCPT.Controller.Milestone;

import FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone.MilestoneRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Milestone.MilestoneResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Service.Milestone.MilestoneService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/FCPT/milestone")
public class MilestoneController {
    private final MilestoneService milestoneService;

    @PreAuthorize("hasAuthority('admin') or hasAuthority('client')")
    @GetMapping("/id/{logId}")
    public ResponseEntity<MilestoneResponseDTO> getPayment(@PathVariable Long id){
        return ResponseEntity.ok(milestoneService.getMilestone(id));
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/all")
    public ResponseEntity<List<MilestoneResponseDTO>>getMilestones(){
        return ResponseEntity.ok(milestoneService.getMilestones());
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/create")
    public ResponseEntity<MilestoneResponseDTO>createMilestone(
            @RequestBody
            @Valid MilestoneRequestDTO request
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(milestoneService.createMilestone(request));
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/update/{logId}")
    public ResponseEntity<MilestoneResponseDTO>createMilestone(
            @PathVariable Long id,
            @RequestBody
            @Valid MilestoneRequestDTO request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(milestoneService.updateMilestone(id,request));
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/delete/{logId}")
    public ResponseEntity<MilestoneResponseDTO>deleteMilestone(
            @PathVariable Long id
    ){
        milestoneService.deleteMilestone(id);
        return ResponseEntity.noContent().build();
    }
}


