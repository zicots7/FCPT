package FreelanceClientsAndPayementsTracker.FCPT.Controller.Accounts;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.AccountRequestUpdateDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.AccountsRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Accounts.AccountsResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Service.Accounts.AccountsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/FCPT/accounts")
@RequiredArgsConstructor
public class AccountsController {

private final AccountsService accountsService;
@PreAuthorize("hasAuthority('admin')")
@PostMapping("/register")
public ResponseEntity<AccountsResponseDTO>register(@RequestBody @Valid AccountsRequestDTO request){
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(accountsService.createAccount(request));
}
@PreAuthorize("hasAuthority('admin') or hasAuthority('client')")
@GetMapping("/{logId}")
public ResponseEntity<AccountsResponseDTO>getAccount(@PathVariable Long id){
    return ResponseEntity.ok(accountsService.getAccount(id));

}
@PreAuthorize("hasAuthority('admin')")
@GetMapping("/admin/all")
public ResponseEntity<List<AccountsResponseDTO>>getAccounts(){
    return ResponseEntity.ok(accountsService.getAccounts());

}
@PreAuthorize("hasAuthority('admin')")
@DeleteMapping("/admin/delete/{logId}")
    public ResponseEntity<AccountsResponseDTO>deleteAccount(@PathVariable Long id){
    accountsService.deleteAccount(id);
    return ResponseEntity.noContent().build();
}
@PreAuthorize("hasAuthority('admin')")
@PutMapping("/admin/update/{logId}")
    public ResponseEntity<AccountsResponseDTO>updateAccount(
            @PathVariable Long id,
            @RequestBody @Valid AccountRequestUpdateDTO request){
    return ResponseEntity.ok(accountsService.updateAccount(id, request));}
}
