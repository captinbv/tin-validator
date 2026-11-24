
import { DefaultTinValidatorFactory } from "../../../../src/validators/countries/DefaultTinValidatorFactory";

import { NetherlandsTinValidator } from "../../../../src/validators/countries/NetherlandsTinValidator";

import { AustriaTinValidator } from "../../../../src/validators/countries/AustriaTinValidator";
describe("DefaultTinValidatorFactory", () => {

    describe("Validator registration", () => {
        test("should register Netherlands validator", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .build();

            expect(factory.getValidatorFor("NL")).toBe(NetherlandsTinValidator);
        });

        test("should register Austria validator", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .with(AustriaTinValidator)
                .build();

            expect(factory.getValidatorFor("AT")).toBe(AustriaTinValidator);
        });

        test("should return undefined for unsupported country", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .build();

            expect(factory.getValidatorFor("XX")).toBeUndefined();
        });
    });

    describe("Custom country registration", () => {
        test("should register validator with specified country codes", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .withCountries(NetherlandsTinValidator, "NL", "NLD")
                .build();

            expect(factory.getValidatorFor("NL")).toBe(NetherlandsTinValidator);
            expect(factory.getValidatorFor("NLD")).toBe(NetherlandsTinValidator);
        });
    });

    describe("Default validator", () => {
        test("should return default validator for unsupported country", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .withDefault(NetherlandsTinValidator)
                .build();

            expect(factory.getValidatorFor("XX")).toBe(NetherlandsTinValidator);
        });

        test("should prefer registered validator over default validator", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .with(AustriaTinValidator)
                .withDefault(NetherlandsTinValidator)
                .build();

            expect(factory.getValidatorFor("AT")).toBe(AustriaTinValidator);
            expect(factory.getValidatorFor("XX")).toBe(NetherlandsTinValidator);
        });
    });

    describe("Mappings", () => {
        test("should return all registered mappings", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .with(AustriaTinValidator)
                .build();

            const mappings = factory.getAllMappings();

            expect(mappings.get("NL")).toBe(NetherlandsTinValidator);
            expect(mappings.get("AT")).toBe(AustriaTinValidator);
        });

        test("should return an independent mappings map", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .build();

            const mappings = factory.getAllMappings();

            (mappings as Map<string, typeof NetherlandsTinValidator>).clear();

            expect(factory.getValidatorFor("NL")).toBe(NetherlandsTinValidator);
        });
    });

    describe("Builder functionality", () => {
        test("should copy mappings from another factory", () => {
            const originalFactory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .build();

            const copiedFactory = DefaultTinValidatorFactory.builder()
                .withAllFrom(originalFactory)
                .build();

            expect(copiedFactory.getValidatorFor("NL")).toBe(NetherlandsTinValidator);
        });

        test("should preserve mappings when using toBuilder", () => {
            const originalFactory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .build();

            const copiedFactory = originalFactory.toBuilder().build();

            expect(copiedFactory.getValidatorFor("NL")).toBe(NetherlandsTinValidator);
        });

        test("should allow adding validators using toBuilder", () => {
            const originalFactory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .build();

            const updatedFactory = originalFactory.toBuilder()
                .with(AustriaTinValidator)
                .build();

            expect(updatedFactory.getValidatorFor("NL")).toBe(NetherlandsTinValidator);
            expect(updatedFactory.getValidatorFor("AT")).toBe(AustriaTinValidator);
        });
    });

    describe("TIN validation through factory", () => {
        test("should validate Netherlands TIN through factory", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .build();

            expect(factory.getValidatorFor("NL")?.validate("123456782")).toBe(true);
        });

        test("should reject invalid Netherlands TIN through factory", () => {
            const factory = DefaultTinValidatorFactory.builder()
                .with(NetherlandsTinValidator)
                .build();

            expect(factory.getValidatorFor("NL")?.validate("123456781")).toBe(false);
        });
    });
});
