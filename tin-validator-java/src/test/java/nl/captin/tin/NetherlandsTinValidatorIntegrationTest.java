
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NetherlandsTinValidatorIntegrationTest {

    private final TinValidatorFactory factory =
            DefaultTinValidatorFactory.INSTANCE;

    private final CountryTinValidator validator =
            factory.getValidatorFor("NL");

    @Test
    void shouldRegisterNetherlandsValidatorInDefaultFactory() {
        assertNotNull(validator);
        assertSame(NetherlandsTinValidator.INSTANCE, validator);
    }

    @Test
    void shouldValidateNetherlandsTinThroughFactory() {
        assertTrue(validator.isValid("123456782", TinType.ANY));
    }

    @Test
    void shouldRejectInvalidNetherlandsTinThroughFactory() {
        assertFalse(validator.isValid("123456781", TinType.ANY));
    }

    @Test
    void shouldRejectNullTinThroughFactory() {
        assertFalse(validator.isValid((String) null, TinType.ANY));
    }

    @Test
    void shouldRejectEmptyTinThroughFactory() {
        assertFalse(validator.isValid("", TinType.ANY));
    }

    @Test
    void shouldContainNetherlandsCountryMapping() {
        assertTrue(factory.getAllMappings().containsKey("NL"));
    }

    @Test
    void shouldReturnNullForUnsupportedCountryWithoutDefaultValidator() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .with(NetherlandsTinValidator.INSTANCE)
                        .build();

        assertNull(customFactory.getValidatorFor("XX"));
    }

}
