package FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Roles;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record AccountRequestUpdateDTO(
    @NotBlank
    String username,
    @Size(min = 8,message = "password must be at least 8 characters")
    String password,
    Roles role,
    @NotBlank
    String firstName,
    @NotBlank
    String lastName,
    @NotBlank
    String email,
    boolean isActive,
    boolean isDemo,
    boolean isStaff,
    boolean isSuperuser,
    LocalDateTime dateJoined,
    LocalDateTime lastLogin
){}