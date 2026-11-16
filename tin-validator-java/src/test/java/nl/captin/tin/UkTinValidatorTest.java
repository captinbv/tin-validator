
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UkTinValidatorTest {

    private final CountryTinValidator validator = UkTinValidator.INSTANCE;

    @Test
    void shouldAcceptValidTenDigitTin() {
        assertTrue(validator.isValid("1234567890", TinType.values()[0]));
    }

    @Test
    void shouldAcceptValidAlphabeticTin() {
        assertTrue(validator.isValid("AB123456", TinType.values()[0]));
    }

    @Test
    void shouldAcceptValidAlphabeticTinWithSuffixA() {
        assertTrue(validator.isValid("AB123456A", TinType.values()[0]));
    }

    @Test
    void shouldAcceptValidAlphabeticTinWithSuffixB() {
        assertTrue(validator.isValid("AB123456B", TinType.values()[0]));
    }

    @Test
    void shouldAcceptValidAlphabeticTinWithSuffixC() {
        assertTrue(validator.isValid("AB123456C", TinType.values()[0]));
    }

    @Test
    void shouldAcceptValidAlphabeticTinWithSuffixD() {
        assertTrue(validator.isValid("AB123456D", TinType.values()[0]));
    }

    @Test
    void shouldRejectInvalidPrefixes() {
        assertFalse(validator.isValid("GB123456", TinType.values()[0]));
        assertFalse(validator.isValid("NK123456", TinType.values()[0]));
        assertFalse(validator.isValid("TN123456", TinType.values()[0]));
        assertFalse(validator.isValid("ZZ123456", TinType.values()[0]));
    }

    @Test
    void shouldRejectInvalidLength() {
        assertFalse(validator.isValid("123456789", TinType.values()[0]));
        assertFalse(validator.isValid("12345678901", TinType.values()[0]));
        assertFalse(validator.isValid("AB12345", TinType.values()[0]));
        assertFalse(validator.isValid("AB1234567", TinType.values()[0]));
    }

    @Test
    void shouldRejectInvalidCharacters() {
        assertFalse(validator.isValid("AB12345@", TinType.values()[0]));
        assertFalse(validator.isValid("1B123456", TinType.values()[0]));
        assertFalse(validator.isValid("A1123456", TinType.values()[0]));
        assertFalse(validator.isValid("AB12345E", TinType.values()[0]));
    }

    @Test
    void shouldRejectInvalidSuffix() {
        assertFalse(validator.isValid("AB123456E", TinType.values()[0]));
        assertFalse(validator.isValid("AB1234561", TinType.values()[0]));
    }

    @Test
    void shouldRejectNullAndEmptyTin() {
        assertFalse(validator.isValid(null, TinType.values()[0]));
        assertFalse(validator.isValid("", TinType.values()[0]));
    }

    @Test
    void shouldRejectWhitespaceOnlyTin() {
        assertFalse(validator.isValid("   ", TinType.values()[0]));
    }

    @Test
    void shouldAcceptTinWithCountryPrefixIfSupportedBySanitise() {
        assertTrue(validator.isValid("GB1234567890", TinType.values()[0]));
    }

    @Test
    void shouldAcceptLowercaseTinIfSupportedBySanitise() {
        assertTrue(validator.isValid("ab123456", TinType.values()[0]));
    }

}
