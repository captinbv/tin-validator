
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

class CountryTinValidatorTest {

    private final CountryTinValidator validator =
            NetherlandsTinValidator.INSTANCE;

    @Test
    void shouldValidateValidTin() {
        assertTrue(validator.isValid("123456782"));
    }

    @Test
    void shouldRejectInvalidTin() {
        assertFalse(validator.isValid("123456781"));
    }

    @Test
    void shouldRejectNullTin() {
        assertFalse(validator.isValid((String) null));
    }

    @Test
    void shouldRejectEmptyTin() {
        assertFalse(validator.isValid(""));
    }

    @Test
    void shouldValidateTinWithAcceptedType() {
        assertTrue(validator.isValid("123456782", TinType.ANY));
    }

    @Test
    void shouldRejectNullTinWithAcceptedType() {
        assertFalse(validator.isValid((String) null, TinType.ANY));
    }

    @Test
    void shouldAcceptNullAcceptedType() {
        assertTrue(validator.isValid("123456782", (TinType) null));
    }


    @Test
    void shouldValidateTinForSupportedCountry() {
        assertTrue(validator.isValid("NL", "123456782"));
    }

    @Test
    void shouldRejectTinForUnsupportedCountry() {
        assertFalse(validator.isValid("XX", "123456782"));
    }

    @Test
    void shouldRejectNullCountryCode() {
        assertFalse(validator.isValid((String) null, "123456782"));
    }

    @Test
    void shouldValidateTinForCountryWithAcceptedType() {
        assertTrue(validator.isValid("NL", "123456782", TinType.ANY));
    }

    @Test
    void shouldRejectNullTinForCountryWithAcceptedType() {
        assertFalse(validator.isValid("NL", (String) null, TinType.ANY));
    }

    @Test
    void shouldAcceptNullAcceptedTypeForCountry() {
        assertTrue(validator.isValid("NL", "123456782", (TinType) null));
    }

    @Test
    void shouldReturnSupportedCountries() {
        Collection<String> countries = validator.getSupportedCountries();

        assertNotNull(countries);
        assertTrue(countries.contains("NL"));
    }

    @Test
    void shouldIdentifySupportedCountry() {
        assertTrue(validator.isCountrySupported("NL"));
    }

    @Test
    void shouldRejectUnsupportedCountry() {
        assertFalse(validator.isCountrySupported("XX"));
    }

    @Test
    void shouldRejectNullCountryInSupportCheck() {
        assertFalse(validator.isCountrySupported(null));
    }
}
