package FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.mapper;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Clients.ClientResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Clients;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ClientMapper {
    public ClientResponseDTO toResponse(Clients client) {
        return new ClientResponseDTO(
                client.getId(),
                client.getUser().getUsername(),
                client.getFirstName(),
                client.getLastName(),
                client.getUser().getEmail(),
                client.getPlatform(),
                client.getCompany(),
                client.getAddedDate()

        );
}}
