package FreelanceClientsAndPayementsTracker.FCPT.Security;
import FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts.Accounts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class AuthUtil {
    @Value("${JWT.SECRET_KEY}")
    private String jwtSecretKey;
    private SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }
    public String GenerateAccessToken(Accounts account) {
        return Jwts.builder()
                .setSubject(account.getUsername())
                .claim("userId",account.getId().toString())
                .claim("role",account.getRole())
                .setIssuedAt(new Date())
                .signWith(getSecretKey())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 20))
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}