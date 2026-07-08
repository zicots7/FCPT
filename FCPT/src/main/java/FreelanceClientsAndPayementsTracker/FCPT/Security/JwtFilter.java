package FreelanceClientsAndPayementsTracker.FCPT.Security;

import FreelanceClientsAndPayementsTracker.FCPT.DAO.Accounts.AccountsRepository;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import FreelanceClientsAndPayementsTracker.FCPT.Exceptions.ResourceNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
@Component
@AllArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    private final HandlerExceptionResolver handlerExceptionResolver;
    private final AuthUtil authUtil;
    private final AccountsRepository accountsRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    try{
        log.info("Request Coming from the URI: {}", request.getRequestURI());
    final String requestTokenHeader = request.getHeader("Authorization");
    if(requestTokenHeader==null|| !requestTokenHeader.startsWith("Bearer")){
        filterChain.doFilter(request,response);
        return;
    }
    String token = requestTokenHeader.split("Bearer ")[1];
    String username = authUtil.getUsernameFromToken(token);
    if (username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
        Accounts account = accountsRepository.findByUsername(username)
                .orElseThrow(()->new ResourceNotFoundException("User " +username+ " does not exist!"));
        log.info("USER: {} | ROLE BEING GRANTED: {}",
                account.getUsername(),
                account.getAuthorities());
        UsernamePasswordAuthenticationToken Authtoken = new UsernamePasswordAuthenticationToken(account,null,account.getAuthorities());
        SecurityContextHolder.getContext()
                .setAuthentication(Authtoken);
    }
    filterChain.doFilter(request,response);
    }catch(Exception e){
        handlerExceptionResolver.resolveException(request,response,null,e);
    }

    }
}
