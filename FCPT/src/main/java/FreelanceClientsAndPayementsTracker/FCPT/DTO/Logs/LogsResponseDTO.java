package FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs.InteractionType;

import java.time.LocalDateTime;
import java.util.Map;

public record LogsResponseDTO(
         String logId,
         Long pid,
         String message,
         LocalDateTime timestamp,
         String tags,
         InteractionType interactionType,
         Map<String,Object> details
){ }
