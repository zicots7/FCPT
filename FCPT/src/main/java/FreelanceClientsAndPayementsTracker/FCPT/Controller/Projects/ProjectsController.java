package FreelanceClientsAndPayementsTracker.FCPT.Controller.Projects;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Projects.ProjectsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Projects.ProjectsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Service.Projects.ProjectsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/FCPT/projects")
@RequiredArgsConstructor
public class ProjectsController {
    private final ProjectsService projectsService;

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/all")
    public ResponseEntity<List<ProjectsResponseDTO>>getProjects(){
        return   ResponseEntity.ok(projectsService.getProjects());
    }

    @PreAuthorize("hasAuthority('admin') or hasAuthority('client')")
    @GetMapping("/id/{id}")
    public ResponseEntity<ProjectsResponseDTO>getProject(@PathVariable Long id){
        return ResponseEntity.ok(projectsService.getProject(id));

    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/create")
    public ResponseEntity<ProjectsResponseDTO>createProject(@RequestBody @Valid ProjectsRequestDTO request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectsService.createProject(request));
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ProjectsResponseDTO>updateProject(
            @PathVariable Long id,
            @RequestBody
            @Valid ProjectsRequestDTO request){
        return ResponseEntity.status(HttpStatus.OK).body(projectsService.updateProject(id,request));
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProjectsResponseDTO>deleteProject(@PathVariable Long id){
        projectsService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
