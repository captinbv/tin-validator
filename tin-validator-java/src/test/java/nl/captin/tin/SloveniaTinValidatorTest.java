
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SloveniaTinValidatorTest {

    private final SloveniaTinValidator validator =
            (SloveniaTinValidator) SloveniaTinValidator.INSTANCE;

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

    @Test
    void shouldThrowExceptionForEightDigitTin() {
        assertThrows(
                StringIndexOutOfBoundsException.class,
                () -> isValid("12345678")
        );
    }

    @Test
    void shouldReturnFalseForTinWithLessThanEightDigits() {
        assertFalse(isValid("1234567"));
    }

    @Test
    void shouldReturnFalseForTinWithMoreThanEightDigits() {
        assertFalse(isValid("123456789"));
    }

    @Test
    void shouldReturnFalseWhenTinStartsWithZero() {
        assertFalse(isValid("01234567"));
    }

    @Test
    void shouldReturnFalseForAlphabeticCharacters() {
        assertFalse(isValid("1234567A"));
    }

    @Test
    void shouldReturnFalseForSpecialCharacters() {
        assertFalse(isValid("123456@8"));
    }

    @Test
    void shouldReturnFalseForInvalidLengthWithCountryPrefix() {
        assertFalse(isValid("SI1234567"));
    }

    @Test
    void shouldThrowExceptionForEightDigitTinWithCountryPrefix() {
        assertThrows(
                StringIndexOutOfBoundsException.class,
                () -> isValid("SI12345678")
        );
    }
}
