package FreelanceClientsAndPayementsTracker.FCPT.Service.Login;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Login.JWTLoginResponse;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Login.LoginRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.Security.AuthUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {
    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    public JWTLoginResponse login(LoginRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
    Accounts account = (Accounts) authentication.getPrincipal();
    Clients client = account.getClient();
    String token = authUtil.GenerateAccessToken(account);
    return new JWTLoginResponse(token, account.getUsername(), account.getRole().toString(), (client!=null)?client.getId(): account.getId());
    }
}
