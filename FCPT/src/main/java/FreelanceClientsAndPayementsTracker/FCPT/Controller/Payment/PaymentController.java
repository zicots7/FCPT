package FreelanceClientsAndPayementsTracker.FCPT.Controller.Payment;


import FreelanceClientsAndPayementsTracker.FCPT.DTO.Payment.PaymentRequestDTO;
import FreelanceClientsAndPayementsTracker.FCPT.DTO.Payment.PaymentResponseDTO;
import FreelanceClientsAndPayementsTracker.FCPT.Service.Payment.PaymentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/FCPT/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @PreAuthorize("hasAuthority('admin') or hasAuthority('client')")
    @GetMapping("/id/{logId}")
    public ResponseEntity<PaymentResponseDTO>getPayment(@PathVariable Long id){
        return ResponseEntity.ok(paymentService.getPayment(id));
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/all")
    public ResponseEntity<List<PaymentResponseDTO>>getPayments(){
        return ResponseEntity.ok(paymentService.getPayments());
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/create")
    public ResponseEntity<PaymentResponseDTO>createPayment(
            @RequestBody
            @Valid PaymentRequestDTO request
            ){
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.createPayment(request));
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/update/{logId}")
    public ResponseEntity<PaymentResponseDTO>createPayment(
            @PathVariable Long id,
            @RequestBody
            @Valid PaymentRequestDTO request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(paymentService.updatePayment(id,request));
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/delete/{logId}")
    public ResponseEntity<PaymentResponseDTO>deletePayment(
            @PathVariable Long id
    ){
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
