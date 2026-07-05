package FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment;

import FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone.Milestone;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milestone_id", nullable = false)
    private Milestone milestone;

    @Column(nullable = false,name = "amount_paid")
    private Long amountPaid;

    @CreatedDate
    @Column(nullable = false, updatable = false,name = "date_paid")
    private LocalDateTime datePaid;

    @Column(nullable = false, length = 100,name = "payment_method")
    @Convert(converter = PaymentMethodConverter.class) //custom method converter so it will automatically handle fields according to database fields
    private PaymentMethod paymentMethod;
}