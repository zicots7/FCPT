package FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment.Payment;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects.Projects;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
    @Table(name = "milestone")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class Milestone {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "project_name_id")
        private Projects project;

        @Column(nullable = false, length = 500)
        private String description;

        @Column(nullable = false)
        private Long amount;

        @Column(nullable = false,name = "due_date")
        private LocalDateTime dueDate;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false, length = 50,name = "is_paid")
        private PaidStatus isPaid;

        @OneToMany(mappedBy = "milestone", cascade = CascadeType.ALL,orphanRemoval = true)
        private List<Payment> payments;
    }


