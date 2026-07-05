package FreelanceClientsAndPayementsTracker.FCPT.DTO.Logs;

import java.time.LocalDateTime;
import java.util.Map;

public record LogsResponseDTO(
         String logId,
         Long pid,
         String message,
         LocalDateTime timestamp,
         String tags,
         String interactionType,
         Map<String, Object>details
){ }
