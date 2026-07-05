package FreelanceClientsAndPayementsTracker.FCPT.Entity.Payment;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PaymentMethodConverter implements AttributeConverter<PaymentMethod, String> {
        @Override
        public String convertToDatabaseColumn(PaymentMethod attribute) {
            if (attribute == null) return null;
            return attribute.toDbValue();
        }

        @Override
        public PaymentMethod convertToEntityAttribute(String dbData) {
            if (dbData == null) return null;
            return PaymentMethod.fromDbValue(dbData);
        }
}
