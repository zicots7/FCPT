package FreelanceClientsAndPayementsTracker.FCPT.DTO.Payment;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.PaymentMethod;
import java.time.LocalDateTime;

public record PaymentResponseDTO(
        Long amountPaid,
        LocalDateTime datePaid,
        PaymentMethod paymentMethod,
        Long id,
        Long milestoneId,
        String milestone
) {}
