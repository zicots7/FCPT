package FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum PaymentMethod {
    UPI, CARD, CASH, NET_BANKING, CRYPTO;
    public String toDbValue() {
        return this == NET_BANKING ? "NET BANKING" : this.name();
    }

    public static PaymentMethod fromDbValue(String value) {
        if ("NET BANKING".equals(value)) return NET_BANKING;
        return PaymentMethod.valueOf(value);
    }
}
