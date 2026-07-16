package FreelanceClientsAndPayementsTracker.FCPT.Service.Logs;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Mongo.Logs.LogsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Projects.ProjectsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs.LogsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs.LogsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.Logs;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.LogsDetailsConverter;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.mapper.LogsMapper;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
@AllArgsConstructor
public class LogsService {
    private final LogsRepository logsRepository;
    private final LogsMapper logsMapper;
    private final LogsDetailsConverter logsDetailsConverter;

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
    public LogsResponseDTO createLog(
            LogsRequestDTO request
    ){

        Map<String,Object> details =
                logsDetailsConverter.validateAndConvert(
                        request.interactionType(),
                        request.details()
                );

        Logs logs = Logs.builder()
                .logId(
                        UUID.randomUUID()
                                .toString()
                                .substring(0,8)
                )
                .pid(request.pid())

                .message(request.message())

                .timestamp(request.timestamp())

                .tags(request.tags())

                .interactionType(
                        request.interactionType()
                )

                .details(details)

                .build();


        return logsMapper.toResponse(
                logsRepository.save(logs)
        );
    }


    public void deleteLogs(String logId){
        Logs logs = logsRepository.findById(logId)
                .orElseThrow(()->new ResourceNotFoundException("log does not exist"));
        logsRepository.deleteById(logs.getLogId());
    }


}
