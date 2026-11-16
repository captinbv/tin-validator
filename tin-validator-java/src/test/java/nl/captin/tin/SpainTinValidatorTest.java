
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SpainTinValidatorTest {

    private final SpainTinValidator validator =
            (SpainTinValidator) SpainTinValidator.INSTANCE;

    private boolean isValid(String tin) {
        return validator.isValid(tin, (TinType) null);
    }

    @Test
    void shouldReturnFalseForNullTin() {
        assertFalse(isValid(null));
    }

    @Test
    void shouldReturnFalseForEmptyTin() {
        assertFalse(isValid(""));
    }

    // NIF validation

    @Test
    void shouldAcceptValidNif() {
        assertTrue(isValid("12345678Z"));
    }

    @Test
    void shouldRejectInvalidNifChecksum() {
        assertFalse(isValid("12345678A"));
    }

    @Test
    void shouldAcceptValidNifWithKPrefix() {
        assertTrue(isValid("K0000000T"));
    }

    @Test
    void shouldAcceptValidNifWithLPrefix() {
        assertTrue(isValid("L0000000T"));
    }

    @Test
    void shouldAcceptValidNifWithMPrefix() {
        assertTrue(isValid("M0000000T"));
    }

    // NIE validation

    @Test
    void shouldAcceptValidNieWithXPrefix() {
        assertTrue(isValid("X0000000T"));
    }

    @Test
    void shouldAcceptValidNieWithYPrefix() {
        assertTrue(isValid("Y0000000Z"));
    }

    @Test
    void shouldAcceptValidNieWithZPrefix() {
        assertTrue(isValid("Z0000000M"));
    }

    @Test
    void shouldRejectInvalidNieChecksum() {
        assertFalse(isValid("X0000000A"));
    }

    // CIF validation

    @Test
    void shouldAcceptValidCifWithANumericControl() {
        String cif = generateValidCif('A', "1234567");
        assertTrue(isValid(cif));
    }

    @Test
    void shouldAcceptValidCifWithBNumericControl() {
        String cif = generateValidCif('B', "1234567");
        assertTrue(isValid(cif));
    }

    @Test
    void shouldAcceptValidCifWithPLetterControl() {
        String cif = generateValidCif('P', "1234567");
        assertTrue(isValid(cif));
    }

    @Test
    void shouldRejectInvalidCifChecksum() {
        String cif = generateValidCif('A', "1234567");
        char wrongControl = cif.charAt(8) == '9' ? '0' : '9';

        assertFalse(isValid(cif.substring(0, 8) + wrongControl));
    }

    @Test
    void shouldRejectInvalidCifFormat() {
        assertFalse(isValid("A12345678"));
    }

    // Length validation

    @Test
    void shouldRejectTinWithLessThanNineCharacters() {
        assertFalse(isValid("1234567Z"));
    }

    @Test
    void shouldRejectTinWithMoreThanNineCharacters() {
        assertFalse(isValid("123456789Z"));
    }

    @Test
    void shouldRejectAlphabeticCharacters() {
        assertFalse(isValid("ABCDEFGHZ"));
    }

    @Test
    void shouldRejectSpecialCharacters() {
        assertFalse(isValid("1234567@Z"));
    }

    @Test
    void shouldRejectWhitespaceOnlyTin() {
        assertFalse(isValid("         "));
    }

    // Country prefix

    @Test
    void shouldAcceptNifWithCountryPrefix() {
        assertTrue(isValid("ES12345678Z"));
    }

    @Test
    void shouldAcceptNieWithCountryPrefix() {
        assertTrue(isValid("ESX0000000T"));
    }

    @Test
    void shouldAcceptCifWithCountryPrefix() {
        String cif = generateValidCif('A', "1234567");
        assertTrue(isValid("ES" + cif));
    }

    // TinType validation

    @Test
    void shouldAcceptPersonalNifForPersonalType() {
        assertTrue(validator.isValid("12345678Z", TinType.PERSONAL));
    }

    @Test
    void shouldRejectPersonalNifForCompanyType() {
        assertFalse(validator.isValid("12345678Z", TinType.COMPANY));
    }

    @Test
    void shouldAcceptCompanyCifForCompanyType() {
        String cif = generateValidCif('A', "1234567");

        assertTrue(validator.isValid(cif, TinType.COMPANY));
    }

    @Test
    void shouldRejectCompanyCifForPersonalType() {
        String cif = generateValidCif('A', "1234567");

        assertFalse(validator.isValid(cif, TinType.PERSONAL));
    }

    // Helper method for generating CIF checksum

    private String generateValidCif(char type, String number) {
        int sum = 0;

        for (int i = 0; i < number.length(); i++) {
            int tmp = (2 - i % 2) * (number.charAt(i) - '0');
            sum += tmp / 10 + tmp % 10;
        }

        int index = (10 - sum % 10) % 10;

        String control;

        switch (type) {
            case 'A':
            case 'B':
            case 'E':
            case 'H':
                control = String.valueOf("0123456789".charAt(index));
                break;

            case 'K':
            case 'P':
            case 'Q':
            case 'S':
                control = String.valueOf("JABCDEFGHI".charAt(index));
                break;

            default:
                control = String.valueOf("0123456789".charAt(index));
        }

        return type + number + control;
    }
}
