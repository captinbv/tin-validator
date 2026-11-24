
import { NetherlandsTinValidator } from "../../../src/validators/countries/NetherlandsTinValidator";

describe("NetherlandsTinValidator Integration Tests", () => {

    describe("Netherlands validator registration", () => {

        test("should register Netherlands validator", () => {
            expect(NetherlandsTinValidator).toBeDefined();
        });

        test("should support Netherlands country code", () => {
            expect(NetherlandsTinValidator.isCountrySupported("NL")).toBe(true);
        });

    });

    describe("Netherlands TIN validation", () => {

        test("should validate Netherlands TIN", () => {
            expect(NetherlandsTinValidator.validate("123456782")).toBe(true);
        });

        test("should reject invalid Netherlands TIN", () => {
            expect(NetherlandsTinValidator.validate("123456781")).toBe(false);
        });

        test("should reject null TIN", () => {
            expect(NetherlandsTinValidator.validate(null)).toBe(false);
        });

        test("should reject empty TIN", () => {
            expect(NetherlandsTinValidator.validate("")).toBe(false);
        });

    });

});
