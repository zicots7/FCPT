package FreelanceClientsAndPayementsTracker.FCPT.DTO.Clients;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Platform;

import java.time.LocalDateTime;

public record ClientResponseDTO (
        Long userId,
        String username,
        String firstName,
        String lastName,
        String email,
        Platform platform,
        String company,
        LocalDateTime addedDate

)
{}
