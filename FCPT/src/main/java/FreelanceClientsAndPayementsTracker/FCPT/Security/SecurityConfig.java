package FreelanceClientsAndPayementsTracker.FCPT.Security;
import lombok.AllArgsConstructor;
import org.apache.catalina.util.SessionConfig;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig  {

    private final JwtFilter jwtFilter;
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();

    }
    @Bean
    public PasswordEncoder passwordEncoder(){
     return new BCryptPasswordEncoder();
 }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrfConfig->csrfConfig.disable())
                .sessionManagement(sessionConfig->
                                sessionConfig
                                        .sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS
                                        )
                        )
                .authorizeHttpRequests(auth->auth
                        .requestMatchers("/FCPT/auth/login").permitAll()
                        // 1. Admin paths MUST require 'admin' authority
                        .requestMatchers("/FCPT/*/admin/**").hasAuthority("admin")

                        // 2. Client/User paths require 'client' or 'admin'
                        .requestMatchers("/FCPT/*/id/*", "/FCPT/download-invoice/*").hasAnyAuthority("admin", "client")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }
}


