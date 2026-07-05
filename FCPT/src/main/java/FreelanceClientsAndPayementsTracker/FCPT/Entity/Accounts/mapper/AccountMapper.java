package FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.mapper;

import FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.AccountsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {
    public AccountsResponseDTO toResponse(Accounts account) {
        return new AccountsResponseDTO(
                account.getId(),
                account.getUsername(),
                account.getRole().name(),
                account.getFirstName(),
                account.getLastName(),
                account.getEmail(),
                account.getDateJoined(),
                account.getLastLogin(),
                account.isStaff(),
                account.isDemo(),
                account.isSuperuser(),
                account.isActive()
        );
    }
}