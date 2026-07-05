package FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.Login;

import jakarta.validation.constraints.Size;

public record LoginRequestDTO(
        String username,
        @Size(min = 8,message = "password must be at least 8 characters")
        String password
){}
