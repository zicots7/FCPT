package FreelanceClientsAndPayementsTracker.FCPT.Controller.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Clients.ClientResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Clients.ClientsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Service.Clients.ClientsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/FCPT/clients")
@RequiredArgsConstructor
public class ClientsController {
    private final ClientsService clientsService;

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/admin/register")
    public ResponseEntity<ClientResponseDTO>register(
            @RequestBody
            @Valid
            ClientsRequestDTO request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clientsService.createClient(request));
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/admin/all")
    public ResponseEntity<List<ClientResponseDTO>>getClients(){
        return ResponseEntity.ok(clientsService.getClients());
    }
    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/id/{id}")
    public ResponseEntity<ClientResponseDTO>getClient(@PathVariable Long id){
        return ResponseEntity.ok(clientsService.getClient(id));
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<ClientResponseDTO>deleteClient(@PathVariable Long id){
        clientsService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/admin/update/{id}")
    public ResponseEntity<ClientResponseDTO> updateClient(
            @PathVariable Long id,
            @RequestBody @Valid ClientsRequestDTO request){

        return ResponseEntity.ok(clientsService.updateClient(id,request));
    }

}
