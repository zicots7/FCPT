package FreelanceClientsAndPayementsTracker.FCPT.DTO.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Platform;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public record ClientsRequestDTO(
        @NotBlank(message = "First Name is required")
        String firstName,
        @NotBlank(message = "Last Name is required")
        String lastName,
        @NotBlank(message = "Username is required")
        String username,
        String password,
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,
        Platform platform,
        LocalDateTime addedDate,
        @NotBlank(message = "Company is required")
        String company

){}
