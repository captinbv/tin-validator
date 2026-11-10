
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PortugalTinValidatorTest {

    private final PortugalTinValidator validator =
            (PortugalTinValidator) PortugalTinValidator.INSTANCE;

    private boolean isValid(String tin) {
        return validator.isValid(tin, (TinType) null);
    }

    @Test
    void shouldReturnTrueForValidTinStartingWith1() {
        assertTrue(isValid("123456789"));
    }

    @Test
    void shouldReturnTrueForValidTinStartingWith3() {
        assertTrue(isValid("300000006"));
    }

    @Test
    void shouldReturnTrueForValidTinStartingWith5() {
        assertTrue(isValid("500000000"));
    }

    @Test
    void shouldReturnTrueForValidTinStartingWith6() {
        assertTrue(isValid("600000001"));
    }

    @Test
    void shouldReturnTrueForValidTinStartingWith8() {
        assertTrue(isValid("800000005"));
    }

    @Test
    void shouldReturnTrueForValidTinStartingWith45() {
        assertTrue(isValid("450000001"));
    }

    @Test
    void shouldReturnTrueForValidTinStartingWith7() {
        assertTrue(isValid("700000003"));
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
    void shouldReturnFalseForTinWithLessThanNineDigits() {
        assertFalse(isValid("12345678"));
    }

    @Test
    void shouldReturnFalseForTinWithMoreThanNineDigits() {
        assertFalse(isValid("1234567890"));
    }

    @Test
    void shouldReturnFalseForInvalidStartingDigit() {
        assertFalse(isValid("023456789"));
        assertFalse(isValid("423456789"));
    }

    @Test
    void shouldReturnFalseForInvalidSecondPatternPrefix() {
        assertFalse(isValid("460000001"));
        assertFalse(isValid("730000003"));
        assertFalse(isValid("920000001"));
    }

    @Test
    void shouldReturnFalseForAlphabeticTin() {
        assertFalse(isValid("12345678A"));
    }

    @Test
    void shouldAcceptTinAfterRemovingFormattingCharacters() {
        assertTrue(isValid("1234-56789"));
    }

    @Test
    void shouldReturnFalseForInvalidChecksum() {
        assertFalse(isValid("123456780"));
    }

    @Test
    void shouldReturnFalseForAllZeros() {
        assertFalse(isValid("000000000"));
    }

    @Test
    void shouldHandleAcceptedType() {
        assertTrue(validator.isValid("123456789", (TinType) null));
    }

    @Test
    void shouldReturnSameSingletonInstance() {
        assertSame(
                PortugalTinValidator.INSTANCE,
                PortugalTinValidator.INSTANCE
        );
    }
}
