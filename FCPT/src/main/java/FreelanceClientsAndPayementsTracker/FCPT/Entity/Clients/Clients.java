package FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Table(name="client")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Clients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="user_id",referencedColumnName = "id",nullable = false)
    private Accounts user;

    @NotNull(message = "First Name Required")
    @Column(nullable = false,name = "first_name")
    private String firstName;

    @NotNull(message = "Last Name Required")
    @Column(nullable = false,name = "last_name")
    private String lastName;

    @NotNull(message = "Email Required")
    @Column(nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Platform Required")
    @Column(nullable = false)
    private Platform platform;

    @Column(nullable = true)
    private String company;

    @CreationTimestamp
    @Column(updatable = false,name = "added_date")
    private LocalDateTime addedDate;

}

/*
ID Column will be automatically generated.
*/