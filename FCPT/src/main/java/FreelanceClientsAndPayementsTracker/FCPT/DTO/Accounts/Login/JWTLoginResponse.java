package FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.Login;

import java.util.List;

public record JWTLoginResponse(
        String token,
        String username,
        List<String> roles
) {
}
