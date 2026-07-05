package FreelanceClientsAndPayementsTracker.FCPT.Service.Accounts;

import FreelanceClientsAndPayementsTracker.FCPT.DAO.Accounts.AccountsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.AccountRequestUpdateDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.AccountsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.AccountsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.mapper.AccountMapper;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AccountsService {
private final AccountsRepository accountsRepository;
private final PasswordEncoder passwordEncoder;
private final AccountMapper accountMapper;

public AccountsResponseDTO createAccount(AccountsRequestDTO request){
    if(accountsRepository.existsByUsername(request.username())){
        throw new UserAlreadyExistsException("username - '" +request.username()+"' is taken ");
    }
    Accounts accounts = Accounts.builder()
            .username(request.username())
            .password(passwordEncoder.encode(request.password()))
            .role(request.role())
            .firstName(request.firstName())
            .lastName(request.lastName())
            .email(request.email())
            .dateJoined(LocalDateTime.now())
            .lastLogin(LocalDateTime.now())
            .isSuperuser(false)
            .isDemo(false)
            .isStaff(false)
            .isActive(true)
            .build();
    return accountMapper.toResponse(accountsRepository.save(accounts));
}
public void deleteAccount(Long id){
    if(accountsRepository.existsById(id)){
    accountsRepository.deleteById(id);
}
else{throw new ResourceNotFoundException("account does not exist!");}
}
public AccountsResponseDTO updateAccount(Long id, AccountRequestUpdateDTO request) {
    Accounts accounts = accountsRepository.findById(id)
            .orElseThrow(()->new ResourceNotFoundException("Account does not exist!"));
    if (!accounts.getUsername().equals(request.username())) {
        if (accountsRepository.existsByUsername(request.username())) {
            throw new UserAlreadyExistsException("Username '" + request.username() + "' is already taken.");
        }
        accounts.setUsername(request.username());
    }
    accounts.setEmail(request.email());
    accounts.setFirstName(request.firstName());
    accounts.setLastName(request.firstName());
    accounts.setRole(request.role());
    accounts.setDemo(request.isDemo());
    accounts.setActive(request.isActive());
    accounts.setStaff(request.isStaff());
    accounts.setSuperuser(request.isSuperuser());
    if(request.password()!=null && !request.password().isEmpty()){
        accounts.setPassword(passwordEncoder.encode(request.password()));
    }
    Accounts updatedAccount = accountsRepository.save(accounts);
    return accountMapper.toResponse(updatedAccount);
}
public AccountsResponseDTO getAccount(Long id) {
    return accountsRepository.findById(id)
            .map(accountMapper::toResponse)
            .orElseThrow(() -> new ResourceNotFoundException("Account not found with logId: " + id));
}

public List<AccountsResponseDTO> getAccounts() {
    return accountsRepository.findAll().stream()
            .map(accountMapper::toResponse)
            .toList();
}


}
