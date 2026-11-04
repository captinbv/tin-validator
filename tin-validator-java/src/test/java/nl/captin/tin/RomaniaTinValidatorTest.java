
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RomaniaTinValidatorTest {

    private static final CountryTinValidator VALIDATOR =
            RomaniaTinValidator.INSTANCE;

    private static final TinType ACCEPTED_TYPE = null;

    @Test
    void shouldAcceptValidCnp() {
        assertTrue(VALIDATOR.isValid("1960523420017", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectInvalidChecksum() {
        assertFalse(VALIDATOR.isValid("1960523420018", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectNullTin() {
        assertFalse(VALIDATOR.isValid(null, ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectEmptyTin() {
        assertFalse(VALIDATOR.isValid("", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectTinWithLessThan13Digits() {
        assertFalse(VALIDATOR.isValid("196052342001", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectTinWithMoreThan13Digits() {
        assertFalse(VALIDATOR.isValid("19605234200189", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectAlphabeticCharacters() {
        assertFalse(VALIDATOR.isValid("19605234200AB", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectSpecialCharacters() {
        assertFalse(VALIDATOR.isValid("19605234200@8", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectWhitespaceOnlyTin() {
        assertFalse(VALIDATOR.isValid("             ", ACCEPTED_TYPE));
    }

    @Test
    void shouldAcceptCnpWithEmbeddedWhitespace() {
        assertTrue(VALIDATOR.isValid("196052342 0017", ACCEPTED_TYPE));
    }

    @Test
    void shouldAcceptAllZerosBasedOnChecksum() {
        assertTrue(VALIDATOR.isValid("0000000000000", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectAllNines() {
        assertFalse(VALIDATOR.isValid("9999999999999", ACCEPTED_TYPE));
    }

    @Test
    void shouldValidateChecksumRemainderTen() {
        assertTrue(VALIDATOR.isValid("5000000000001", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectIncorrectChecksumWhenRemainderIsTen() {
        assertFalse(VALIDATOR.isValid("5000000000002", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectInvalidChecksumForZeroRemainder() {
        assertFalse(VALIDATOR.isValid("1000000000001", ACCEPTED_TYPE));
    }

    @Test
    void shouldAcceptCnpWithLeadingAndTrailingSpaces() {
        assertTrue(VALIDATOR.isValid(" 1960523420017 ", ACCEPTED_TYPE));
    }

    @Test
    void shouldAcceptCnpWithRomanianCountryPrefix() {
        assertTrue(VALIDATOR.isValid("RO1960523420017", ACCEPTED_TYPE));
    }

    @Test
    void shouldRejectCnpWithInvalidChecksumAndCountryPrefix() {
        assertFalse(VALIDATOR.isValid("RO1960523420018", ACCEPTED_TYPE));
    }
}
