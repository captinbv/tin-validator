
package nl.captin.tin;

import java.util.regex.Pattern;
import org.jetbrains.annotations.Contract;

public final class NetherlandsTinValidator extends AbstractCountryTinValidator {

    public static final CountryTinValidator INSTANCE =
            new NetherlandsTinValidator();

    private static final Pattern TIN_REGEX =
            Pattern.compile("^[0-9]{9}$");

    private NetherlandsTinValidator() {
        super("NL", "NLD", "528");
    }

    @Contract("null,_ -> false")
    @Override
    public boolean isValid(String tin, TinType acceptedType) {

        tin = sanitise(tin, "NL");

        if (tin == null || !TIN_REGEX.matcher(tin).matches()) {
            return false;
        }

        // Reject all-zero TIN
        if ("000000000".equals(tin)) {
            return false;
        }

        int sum = 0;

        for (int i = 0; i < 8; i++) {
            int digit = tin.charAt(i) - '0';
            sum += digit * (9 - i);
        }

        int remainder = sum % 11;

        if (remainder == 10) {
            return false;
        }

        return tin.charAt(8) - '0' == remainder;
    }
}