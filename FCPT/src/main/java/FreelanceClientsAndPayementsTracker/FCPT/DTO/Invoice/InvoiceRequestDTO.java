package FreelanceClientsAndPayementsTracker.FCPT.DTO.Invoice;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

public record InvoiceRequestDTO(
         String ClientName,
         int Amount,
         String ProjectDescription,
         String ProjectName,
         String Date

){}
