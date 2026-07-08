package FreelanceClientsAndPayementsTracker.FCPT.Service.Login;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Accounts.AccountsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserLoader implements UserDetailsService {
    private final AccountsRepository accountsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountsRepository.findByUsername(username)
                .orElseThrow(()->new ResourceNotFoundException("Username" +username +"does not exist!"));
    }

}
