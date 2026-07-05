package FreelanceClientsAndPayementsTracker.FCPT.DTO.Payment;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.PaymentMethod;
import java.time.LocalDateTime;

public record PaymentRequestDTO (
        Long amountPaid,
        LocalDateTime datePaid,
        PaymentMethod paymentMethod,
        Long milestoneId
){}
