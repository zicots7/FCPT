package FreelanceClientsAndPayementsTracker.FCPT.Service.Logs;

import FreelanceClientsAndPayementsTracker.FCPT.DAO.Mongo.Logs.LogsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Projects.ProjectsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs.LogsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs.LogsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.Logs;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.mapper.LogsMapper;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LogsService {
    private final LogsRepository logsRepository;
    private final ProjectsRepository projectsRepository;
    private final LogsMapper logsMapper;

    public List<LogsResponseDTO>getLogs(){
        return logsRepository.findAll().stream()
                .map(logsMapper::toResponse)
                .toList();
    }

    public List<LogsResponseDTO> getLog(Long pid) {
        return logsRepository.findBypid(pid).stream()
                .map(logsMapper::toResponse)
                .toList();
    }
    @Transactional
    public LogsResponseDTO createLog(LogsRequestDTO request){
        Logs logs = Logs.builder()
                .logId(java.util.UUID.randomUUID().toString())
                .pid(request.pid())
                .tags(request.tags())
                .message(request.message())
                .timestamp(request.timestamp())
                .interactionType(request.interactionType())
                .details(request.details())
                .build();
        return logsMapper.toResponse(logsRepository.save(logs));
    }

    public void deleteLogs(String logId){
        Logs logs = logsRepository.findById(logId)
                .orElseThrow(()->new ResourceNotFoundException("log does not exist"));
        logsRepository.deleteById(logs.getLogId());
    }


}
