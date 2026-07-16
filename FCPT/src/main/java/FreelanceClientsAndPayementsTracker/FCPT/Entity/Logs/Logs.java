package FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.LocalDateTime;
import java.util.Map;


@Document(collection="logs")
@Builder
@Data
public class Logs {
    @Id
    private String id;
    @Field("log_id")
    private String logId;
    @Field("project_id")
    private Long pid;
    @Field("messages")
    private String message;
    private LocalDateTime timestamp;
    private String tags;
    @Field("interaction_type")
    private InteractionType interactionType;
    private Map<String,Object> details;
}
