
package nl.captin.tin;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TinValidatorFactoryTest {

    private TinValidatorFactory factory;

    @BeforeEach
    void setUp() {
        factory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator.INSTANCE)
                .with(AustriaTinValidator.INSTANCE)
                .build();
    }

    @Test
    void shouldReturnAllMappings() {
        Map<String, CountryTinValidator> mappings =
                factory.getAllMappings();

        assertNotNull(mappings);
        assertTrue(mappings.containsKey("NL"));
        assertTrue(mappings.containsKey("AT"));
    }

    @Test
    void shouldReturnCorrectValidatorForCountry() {
        assertSame(
                NetherlandsTinValidator.INSTANCE,
                factory.getValidatorFor("NL")
        );

        assertSame(
                AustriaTinValidator.INSTANCE,
                factory.getValidatorFor("AT")
        );
    }

    @Test
    void shouldReturnNullForUnsupportedCountry() {
        assertNull(factory.getValidatorFor("XX"));
    }

    @Test
    void shouldReturnPreconfiguredBuilder() {
        TinValidatorFactory.Builder builder = factory.toBuilder();

        assertNotNull(builder);

        TinValidatorFactory copiedFactory = builder.build();

        assertSame(
                NetherlandsTinValidator.INSTANCE,
                copiedFactory.getValidatorFor("NL")
        );

        assertSame(
                AustriaTinValidator.INSTANCE,
                copiedFactory.getValidatorFor("AT")
        );
    }

    @Test
    void shouldAllowAddingValidatorThroughBuilder() {
        TinValidatorFactory updatedFactory = factory.toBuilder()
                .withDefault(NetherlandsTinValidator.INSTANCE)
                .build();

        assertSame(
                NetherlandsTinValidator.INSTANCE,
                updatedFactory.getValidatorFor("XX")
        );
    }

    @Test
    void shouldCopyMappingsFromAnotherFactory() {
        TinValidatorFactory copiedFactory =
                DefaultTinValidatorFactory.builder()
                        .withAllFrom(factory)
                        .build();

        assertSame(
                NetherlandsTinValidator.INSTANCE,
                copiedFactory.getValidatorFor("NL")
        );

        assertSame(
                AustriaTinValidator.INSTANCE,
                copiedFactory.getValidatorFor("AT")
        );
    }

    @Test
    void shouldReturnIndependentMappings() {
        Map<String, CountryTinValidator> mappings =
                factory.getAllMappings();

        assertThrows(
                UnsupportedOperationException.class,
                () -> mappings.put("XX", NetherlandsTinValidator.INSTANCE)
        );
    }
}

