package FreelanceClientsAndPayementsTracker.FCPT.Service.Payment;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Milestone.MilestoneRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Payment.PaymentRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DAO.Projects.ProjectsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Payment.PaymentRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Payment.PaymentResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.PaidStatus;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.Payment;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.mapper.PaymentMapper;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    private final MilestoneRepository milestoneRepository;
    private final ProjectsRepository projectsRepository;

    public PaymentResponseDTO getPayment(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("payment does not exist"));
        return paymentMapper.toResponse(payment);
    }

    public List<PaymentResponseDTO> getPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentMapper::toResponse).toList();
    }

    @Transactional
    public PaymentResponseDTO createPayment(@Valid PaymentRequestDTO request) {
        Milestone milestone = milestoneRepository.findById(request.milestoneId())
                .orElseThrow(() -> new ResourceNotFoundException("Milestone not found"));
        Projects project = milestone.getProject();

        // 1. Capture state BEFORE changes
        PaidStatus oldStatus = milestone.getIsPaid();
        Long originalMilestoneAmount = milestone.getAmount();

        // 2. Perform math
        milestone.setAmount(milestone.getAmount() - request.amountPaid());

        // 3. Update Status
        if (milestone.getAmount() <= 0) {
            milestone.setIsPaid(PaidStatus.Yes);
        }

        // 4. PROJECT UPDATE: If it flipped to YES, subtract the ORIGINAL amount
        if (oldStatus == PaidStatus.No && milestone.getIsPaid() == PaidStatus.Yes) {
            project.setTotalValue(project.getTotalValue() - originalMilestoneAmount);
            projectsRepository.save(project); // Must save the project!
        }
        // 5. Persist changes
        milestoneRepository.save(milestone);

        Payment payment = Payment.builder()
                .paymentMethod(request.paymentMethod())
                .amountPaid(request.amountPaid())
                .datePaid(request.datePaid())
                .milestone(milestone)
                .build();
        return paymentMapper.toResponse(paymentRepository.save(payment));
    }

    @Transactional
    public PaymentResponseDTO updatePayment(Long id, @Valid PaymentRequestDTO request) {
        Milestone milestone = milestoneRepository.findById(request.milestoneId())
                .orElseThrow(() -> new ResourceNotFoundException("Milestone not found"));
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Payment does not exist"));
        Projects project = milestone.getProject();
        // 1. Capture old state
        Long oldAmount = payment.getAmountPaid();
        Long newAmount = request.amountPaid();
        PaidStatus oldStatus = milestone.getIsPaid();

        // 2. Reverse impact of old payment on Milestone
        milestone.setAmount(milestone.getAmount() + oldAmount);

        // 3. Apply new impact of payment on Milestone
        milestone.setAmount(milestone.getAmount() - newAmount);

        // 4. AUTO-STATUS: If balance reaches 0, set status to YES
        if (milestone.getAmount() <= 0) {
            milestone.setIsPaid(PaidStatus.Yes);
        }

        // 5. PROJECT UPDATE: If status flipped to YES just now, update project total
        if (oldStatus == PaidStatus.No && milestone.getIsPaid() == PaidStatus.Yes) {
            project.setTotalValue(project.getTotalValue() - milestone.getAmount());
            projectsRepository.save(project);
        }

        // 6. Save updates
        payment.setAmountPaid(newAmount);
        payment.setPaymentMethod(request.paymentMethod());
        paymentRepository.save(payment);
        milestoneRepository.save(milestone);

        return paymentMapper.toResponse(payment);
    }
    @Transactional
    public void deletePayment(Long id) {
        Payment payment= paymentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Payment does not exist"));
        paymentRepository.deleteById(payment.getId());

    }
}
