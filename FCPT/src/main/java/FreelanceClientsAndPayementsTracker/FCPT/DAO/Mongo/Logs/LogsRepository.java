package FreelanceClientsAndPayementsTracker.FCPT.DAO.Mongo.Logs;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.Logs;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LogsRepository extends MongoRepository<Logs,String> {
    List<Logs> findBypid(Long projectId);
}
