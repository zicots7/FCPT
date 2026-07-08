package FreelanceClientsAndPayementsTracker.FCPT.Controller.Login;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Login.JWTLoginResponse;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Login.LoginRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Service.Login.LoginService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/FCPT/auth")
public class LoginController {
private final LoginService loginService;

@PostMapping("/login")
public ResponseEntity<JWTLoginResponse>login(@RequestBody LoginRequestDTO request){
    return ResponseEntity.ok(loginService.login(request));
}
}
