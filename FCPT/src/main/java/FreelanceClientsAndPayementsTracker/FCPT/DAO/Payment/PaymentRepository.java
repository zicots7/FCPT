package FreelanceClientsAndPayementsTracker.FCPT.DAO.Payment;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    // Join from Payment -> Milestone -> Project
    @Query("SELECT p FROM Payment p WHERE p.milestone.project.id = :projectId")
    List<Payment> findAllByProjectId(@Param("projectId") Long projectId);
}

