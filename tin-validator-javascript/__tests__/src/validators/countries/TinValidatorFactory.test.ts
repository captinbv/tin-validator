
import { DefaultTinValidatorFactory } from "../../../../src/validators/countries/DefaultTinValidatorFactory";
import { NetherlandsTinValidator } from "../../../../src/validators/countries/NetherlandsTinValidator";
import { AustriaTinValidator } from "../../../../src/validators/countries/AustriaTinValidator";

describe("TinValidatorFactory", () => {

    describe("getValidatorFor", () => {

        test("should return validator for registered country", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL")
                .build();

            expect(factory.getValidatorFor("NL"))
                .toBe(NetherlandsTinValidator);
        });

        test("should return undefined for unsupported country", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL")
                .build();

            expect(factory.getValidatorFor("XX"))
                .toBeUndefined();
        });

        test("should return default validator for unsupported country", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .withDefault(NetherlandsTinValidator)
                .build();

            expect(factory.getValidatorFor("XX"))
                .toBe(NetherlandsTinValidator);
        });
    });

    describe("getAllMappings", () => {

        test("should return all registered country mappings", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL", "NLD")
                .withCountries(AustriaTinValidator, "AT")
                .build();

            const mappings = factory.getAllMappings();

            expect(mappings.get("NL")).toBe(NetherlandsTinValidator);
            expect(mappings.get("NLD")).toBe(NetherlandsTinValidator);
            expect(mappings.get("AT")).toBe(AustriaTinValidator);
        });

        test("should return empty mappings when no validators are registered", () => {
            const factory = DefaultTinValidatorFactory.builder().build();

            expect(factory.getAllMappings().size).toBe(0);
        });
    });

    describe("toBuilder", () => {

        test("should create builder with existing mappings", () => {
            const originalFactory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL")
                .build();

            const copiedFactory = originalFactory.toBuilder().build();

            expect(copiedFactory.getValidatorFor("NL"))
                .toBe(NetherlandsTinValidator);
        });

        test("should preserve default validator", () => {
            const originalFactory = DefaultTinValidatorFactory.builder()
                .withDefault(NetherlandsTinValidator)
                .build();

            const copiedFactory = originalFactory.toBuilder().build();

            expect(copiedFactory.getValidatorFor("XX"))
                .toBe(NetherlandsTinValidator);
        });

        test("should allow adding another validator to copied factory", () => {
            const originalFactory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL")
                .build();

            const updatedFactory = originalFactory.toBuilder()
                .withCountries(AustriaTinValidator, "AT")
                .build();

            expect(updatedFactory.getValidatorFor("NL"))
                .toBe(NetherlandsTinValidator);

            expect(updatedFactory.getValidatorFor("AT"))
                .toBe(AustriaTinValidator);
        });
    });

    describe("Builder", () => {

        test("should overwrite previous country mapping", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL")
                .withCountries(AustriaTinValidator, "NL")
                .build();

            expect(factory.getValidatorFor("NL"))
                .toBe(AustriaTinValidator);
        });

        test("should copy mappings using withAllFrom", () => {
            const originalFactory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL")
                .build();

            const copiedFactory = DefaultTinValidatorFactory.builder()
                .withAllFrom(originalFactory)
                .build();

            expect(copiedFactory.getValidatorFor("NL"))
                .toBe(NetherlandsTinValidator);
        });

        test("should return the same builder for chaining", () => {
            const builder = DefaultTinValidatorFactory.builder();

            expect(
                builder.withCountries(NetherlandsTinValidator, "NL")
            ).toBe(builder);
        });

        test("should register multiple country codes", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL", "NLD", "528")
                .build();

            expect(factory.getValidatorFor("NL"))
                .toBe(NetherlandsTinValidator);

            expect(factory.getValidatorFor("NLD"))
                .toBe(NetherlandsTinValidator);

            expect(factory.getValidatorFor("528"))
                .toBe(NetherlandsTinValidator);
        });
    });
});
