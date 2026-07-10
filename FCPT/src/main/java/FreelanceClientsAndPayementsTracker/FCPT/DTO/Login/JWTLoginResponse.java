package FreelanceClientsAndPayementsTracker.FCPT.DTO.Login;
public record JWTLoginResponse(
        String token,
        String username,
        String role,
        Long id
) {
}
