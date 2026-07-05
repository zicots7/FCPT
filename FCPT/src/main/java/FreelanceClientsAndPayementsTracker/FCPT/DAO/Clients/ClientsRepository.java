package FreelanceClientsAndPayementsTracker.FCPT.DAO.Clients;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Clients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientsRepository extends JpaRepository<Clients,Long> {
    Optional<Clients>findById(Long id);
    boolean existsByUser_Username(String username);
}
