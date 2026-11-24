
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class DefaultTinValidatorFactoryTest {

    private final TinValidatorFactory factory =
            DefaultTinValidatorFactory.INSTANCE;

    @Test
    void shouldRegisterAllDefaultValidators() {
        assertNotNull(factory.getValidatorFor("NL"));
        assertNotNull(factory.getValidatorFor("GB"));
        assertNotNull(factory.getValidatorFor("DE"));
        assertNotNull(factory.getValidatorFor("FR"));
    }

    @Test
    void shouldReturnNetherlandsValidatorForNL() {
        assertSame(
                NetherlandsTinValidator.INSTANCE,
                factory.getValidatorFor("NL")
        );
    }

    @Test
    void shouldReturnNullForUnsupportedCountryWithoutDefaultValidator() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .with(NetherlandsTinValidator.INSTANCE)
                        .build();

        assertNull(customFactory.getValidatorFor("XX"));
    }

    @Test
    void shouldReturnDefaultValidatorForUnsupportedCountry() {
        CountryTinValidator defaultValidator =
                NetherlandsTinValidator.INSTANCE;

        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .withDefault(defaultValidator)
                        .build();

        assertSame(
                defaultValidator,
                customFactory.getValidatorFor("XX")
        );
    }

    @Test
    void shouldRegisterValidatorForAllSupportedCountries() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .with(NetherlandsTinValidator.INSTANCE)
                        .build();

        assertSame(
                NetherlandsTinValidator.INSTANCE,
                customFactory.getValidatorFor("NL")
        );
    }

    @Test
    void shouldRegisterValidatorForSpecifiedCountryCodes() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .with(NetherlandsTinValidator.INSTANCE, "NL", "NLD")
                        .build();

        assertSame(
                NetherlandsTinValidator.INSTANCE,
                customFactory.getValidatorFor("NL")
        );

        assertSame(
                NetherlandsTinValidator.INSTANCE,
                customFactory.getValidatorFor("NLD")
        );
    }

    @Test
    void shouldCopyMappingsFromExistingFactory() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .withAllFrom(factory)
                        .build();

        assertSame(
                NetherlandsTinValidator.INSTANCE,
                customFactory.getValidatorFor("NL")
        );
    }

    @Test
    void shouldCreateBuilderFromExistingFactory() {
        TinValidatorFactory customFactory =
                factory.toBuilder().build();

        assertSame(
                NetherlandsTinValidator.INSTANCE,
                customFactory.getValidatorFor("NL")
        );
    }

    @Test
    void shouldAllowOverridingExistingCountryMapping() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .with(NetherlandsTinValidator.INSTANCE, "NL")
                        .with(UkTinValidator.INSTANCE, "NL")
                        .build();

        assertSame(
                UkTinValidator.INSTANCE,
                customFactory.getValidatorFor("NL")
        );
    }

    @Test
    void shouldReturnUnmodifiableMappings() {
        Map<String, CountryTinValidator> mappings =
                factory.getAllMappings();

        assertThrows(
                UnsupportedOperationException.class,
                () -> mappings.put(
                        "XX",
                        NetherlandsTinValidator.INSTANCE
                )
        );
    }

    @Test
    void shouldIgnoreNullValidatorWhenRegistering() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .with((CountryTinValidator) null)
                        .build();

        assertTrue(customFactory.getAllMappings().isEmpty());
    }

    @Test
    void shouldIgnoreNullFactoryWhenCopyingMappings() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .withAllFrom(null)
                        .build();

        assertTrue(customFactory.getAllMappings().isEmpty());
    }

    @Test
    void shouldAllowNullDefaultValidator() {
        TinValidatorFactory customFactory =
                DefaultTinValidatorFactory.builder()
                        .withDefault(null)
                        .build();

        assertNull(customFactory.getValidatorFor("XX"));
    }
}

