package FreelanceClientsAndPayementsTracker.FCPT.DAO.Milestone;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MilestoneRepository extends JpaRepository<Milestone,Long> {
    List<Milestone> findAllByProjectPid(Long Pid);
    Optional<Milestone> findById(Long id);

}
