package FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts;

import java.time.LocalDateTime;

public record AccountsResponseDTO (
    Long id,
    String username,
    String role,
    String firstName,
    String lastName,
    String email,
    LocalDateTime dateJoined,
    LocalDateTime lastLogin,
    boolean isStaff,
    boolean isSuperuser,
    boolean isDemo,
    boolean isActive
){}

