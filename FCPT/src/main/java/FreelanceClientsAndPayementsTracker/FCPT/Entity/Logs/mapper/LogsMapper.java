package FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.mapper;

import FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs.LogsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.Logs;
import org.springframework.stereotype.Component;

@Component
public class LogsMapper {
    public LogsResponseDTO toResponse(Logs logs){
        return new LogsResponseDTO(
                logs.getLogId(),
                logs.getPid(),
                logs.getMessage(),
                logs.getTimestamp(),
                logs.getTags(),
                logs.getInteractionType(),
                logs.getDetails()
        );
    }
}
