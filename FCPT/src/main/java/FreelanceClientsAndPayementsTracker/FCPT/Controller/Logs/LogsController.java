package FreelanceClientsAndPayementsTracker.FCPT.Controller.Logs;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs.LogsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs.LogsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Service.Logs.LogsService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/FCPT/logs")
@AllArgsConstructor
public class LogsController {
    private final LogsService logsService;

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/admin/all")
    public ResponseEntity<List<LogsResponseDTO>>getLogs(){
        return ResponseEntity.ok(logsService.getLogs());
    }

    @PreAuthorize("hasAuthority('admin') or hasAuthority('client')")
    @GetMapping("/id/{pid}")
    public ResponseEntity<List<LogsResponseDTO>>getLog(@PathVariable Long pid){
        return ResponseEntity.ok(logsService.getLog(pid));
    }

    @PreAuthorize("hasAuthority('admin') or hasAuthority('client')")
    @PostMapping("/create")
    public ResponseEntity<LogsResponseDTO>createLog(
            @RequestBody
            @Valid LogsRequestDTO request){
        return ResponseEntity.status(HttpStatus.CREATED).body(logsService.createLog(request));
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/admin/delete/{logId}")
    public ResponseEntity<LogsResponseDTO>deleteLog(@PathVariable String logId){
        logsService.deleteLogs(logId);
        return ResponseEntity.noContent().build();
    }

}
