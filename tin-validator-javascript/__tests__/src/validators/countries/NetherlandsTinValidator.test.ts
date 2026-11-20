
import { NetherlandsTinValidator } from "../../../../src/validators/countries/NetherlandsTinValidator";

describe("TIN Validation Integration Tests", () => {

    describe("Netherlands TIN validation", () => {

        test("should validate Netherlands TIN using NL country code", () => {
            expect(NetherlandsTinValidator.validate("123456782")).toBe(true);
        });

        test("should reject invalid Netherlands TIN", () => {
            expect(NetherlandsTinValidator.validate("123456781")).toBe(false);
        });

        test("should validate Netherlands TIN using NLD country code", () => {
            expect(NetherlandsTinValidator.isCountrySupported("NLD")).toBe(true);
        });

        test("should validate Netherlands TIN using numeric country code", () => {
            expect(NetherlandsTinValidator.isCountrySupported("528")).toBe(true);
        });

        test("should reject invalid TIN check digit", () => {
            expect(NetherlandsTinValidator.validate("111111111")).toBe(false);
        });

        test("should reject TIN with less than 9 digits", () => {
            expect(NetherlandsTinValidator.validate("12345678")).toBe(false);
        });

        test("should reject TIN with more than 9 digits", () => {
            expect(NetherlandsTinValidator.validate("1234567890")).toBe(false);
        });

        test("should reject alphabetic TIN", () => {
            expect(NetherlandsTinValidator.validate("12345ABCD")).toBe(false);
        });

        test("should reject special characters", () => {
            expect(NetherlandsTinValidator.validate("12345@782")).toBe(false);
        });

        test("should reject whitespace in TIN", () => {
            expect(NetherlandsTinValidator.validate("123 56782")).toBe(false);
        });

        test("should reject empty TIN", () => {
            expect(NetherlandsTinValidator.validate("")).toBe(false);
        });

        test("should accept all-zero TIN according to checksum", () => {
            expect(NetherlandsTinValidator.validate("000000000")).toBe(true);
        });

        test("should reject TIN when remainder is ten", () => {
            expect(NetherlandsTinValidator.validate("000000059")).toBe(false);
        });

        test("should reject unsupported country code", () => {
            expect(NetherlandsTinValidator.isCountrySupported("XX")).toBe(false);
        });
    });
});
