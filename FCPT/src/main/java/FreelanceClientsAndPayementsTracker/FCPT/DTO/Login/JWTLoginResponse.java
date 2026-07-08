package FreelanceClientsAndPayementsTracker.FCPT.DTO.Login;

import java.util.List;

public record JWTLoginResponse(
        String token,
        String username,
        String role,
        Long id
) {
}
