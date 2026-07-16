package FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.mapper;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Payment.PaymentResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {
    public PaymentResponseDTO toResponse(Payment payment){
       return  new PaymentResponseDTO(
               payment.getAmountPaid(),
               payment.getDatePaid(),
               payment.getPaymentMethod(),
               payment.getId(),
               payment.getMilestone().getId(),
               payment.getMilestone().getDescription()
       );

    }
}
