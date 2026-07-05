package FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts;


import FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients.Clients;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Accounts implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Role Required")
    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Roles role;

    @Column(nullable = false)
    private String password;

    @OneToOne(mappedBy = "user")
    private Clients client;

    @Column(nullable = false,unique = true)
    private String username;

    @Column(nullable = false,name ="first_name")
    private String firstName;

    @Column(nullable = false,name = "last_name")
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false,name = "last_login")
    private LocalDateTime lastLogin;

    @CreationTimestamp
    @Column(nullable = false,name = "date_joined")
    private LocalDateTime dateJoined;

    @Column(nullable = false, columnDefinition = "boolean default false",name="is_superuser")
    private boolean isSuperuser = false;

    @Column(nullable = false, columnDefinition = "boolean default false",name="is_demo")
    private boolean isDemo = false;

    @Column(nullable = false, columnDefinition = "boolean default false",name="is_staff")
    private boolean isStaff = false;

    @Column(nullable = false, columnDefinition = "boolean default true",name="is_active")
    private boolean isActive = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority("ROLE_"+this.role.name()));
    }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
