package FreelanceClientsAndPayementsTracker.FCPT.DAO.Projects;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects,Long> {
    List<Projects> findByClientId(Long cid);
    Optional<Projects> findByPid(Long pid);
    boolean existsByPid(Long pid);
    void deleteByPid(Long pid);
}