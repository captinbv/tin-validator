
package nl.captin.tin;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class NetherlandsTinValidatorTest {

    private final CountryTinValidator validator =
            NetherlandsTinValidator.INSTANCE;

    @Test
    void shouldReturnTrueForValidTin() {
        assertTrue(validator.isValid("123456782", TinType.ANY));
    }

    @Test
    void shouldReturnFalseForAllZeroTin() {
        assertFalse(validator.isValid("000000000", TinType.ANY));
    }

    @Test
    void shouldReturnFalseForInvalidCheckDigit() {
        assertFalse(validator.isValid("123456781", TinType.ANY));
        assertFalse(validator.isValid("111111111", TinType.ANY));
    }

    @Test
    void shouldReturnFalseWhenRemainderIsTen() {
        assertFalse(validator.isValid("000000059", TinType.ANY));
    }

    @Test
    void shouldReturnFalseForNullTin() {
        assertFalse(validator.isValid((String) null, TinType.ANY));
    }

    @Test
    void shouldReturnFalseForEmptyTin() {
        assertFalse(validator.isValid("", TinType.ANY));
    }

    @Test
    void shouldReturnFalseForTinWithLessThanNineDigits() {
        assertFalse(validator.isValid("12345678", TinType.ANY));
    }

    @Test
    void shouldReturnFalseForTinWithMoreThanNineDigits() {
        assertFalse(validator.isValid("1234567890", TinType.ANY));
    }

    @Test
    void shouldReturnFalseForAlphabeticCharacters() {
        assertFalse(validator.isValid("12345ABCD", TinType.ANY));
    }

    @Test
    void shouldReturnFalseForSpecialCharacters() {
        assertFalse(validator.isValid("12345@782", TinType.ANY));
    }

    @Test
    void shouldReturnFalseForWhitespace() {
        assertFalse(validator.isValid("123 56782", TinType.ANY));
    }
}
