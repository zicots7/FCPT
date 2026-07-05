package FreelanceClientsAndPayementsTracker.FCPT.Service.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Accounts.AccountsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Clients.ClientsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Clients.ClientResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Clients.ClientsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Roles;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.mapper.ClientMapper;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.UserAlreadyExistsException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ClientsService {
    private final AccountsRepository accountsRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClientsRepository clientsRepository;
    private final ClientMapper clientMapper;

    @Transactional
    public ClientResponseDTO createClient(ClientsRequestDTO request) {
        if(clientsRepository.existsByUser_Username(request.username())){
            throw new UserAlreadyExistsException("username - '" +request.username()+"' is taken ");
        }
        Accounts account = Accounts.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .role(Roles.client)
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .isActive(true)
                .isDemo(false)
                .isStaff(false)
                .isSuperuser(false)
                .build();
        Accounts savedAccount = accountsRepository.save(account);

        Clients client = Clients.builder()
                .user(savedAccount)
                .firstName(savedAccount.getFirstName())
                .lastName(savedAccount.getLastName())
                .email(savedAccount.getEmail())
                .platform(request.platform())
                .addedDate(LocalDateTime.now())
                .company(request.company())
                .build();

    return clientMapper.toResponse(clientsRepository.save(client));
    }

    @Transactional
    public ClientResponseDTO updateClient(Long id, ClientsRequestDTO request){
    Clients clients = clientsRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Client Does not not exist"));
    Accounts account = clients.getUser();

    if(!account.getUsername().equals(request.username())){
        if(accountsRepository.existsByUsername(request.username())){
            throw new UserAlreadyExistsException("Username '" + request.username() + "' is already taken.");
        }
        }
        if (request.password() != null && !request.password().isEmpty()) {
            account.setPassword(passwordEncoder.encode(request.password()));
        }

        account.setUsername(request.username());
        account.setEmail(request.email());
        clients.setFirstName(request.firstName());
        clients.setLastName(request.lastName());
        clients.setCompany(request.company());
        clients.setPlatform(request.platform());
        return clientMapper.toResponse(clients);
    }
    @Transactional
    public void deleteClient(Long id) {
        Clients client = clientsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with logId: " + id));
        clientsRepository.delete(client);
    }

    public List<ClientResponseDTO> getClients(){
        return clientsRepository.findAll().stream()
                .map(clientMapper::toResponse)
                .toList();
    }
    public ClientResponseDTO getClient(Long id){
        return clientsRepository.findById(id)
                .map(clientMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with logId: " + id));
    }
}

