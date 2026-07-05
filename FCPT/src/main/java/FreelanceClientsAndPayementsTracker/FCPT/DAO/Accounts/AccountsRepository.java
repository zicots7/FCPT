package FreelanceClientsAndPayementsTracker.FCPT.DAO.Accounts;


import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts,Long> {
Optional<Accounts>findByUsername(String username);
List<Accounts> findAll();
boolean existsById(Long id);
boolean existsByUsername(String username);
}
