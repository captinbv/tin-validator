import { SloveniaTinValidator } from "../../../../src/validators/countries/SloveniaTinValidator";

describe("SloveniaTinValidator", () => {

    describe("isCountrySupported", () => {
        it("should support SI country code", () => {
            expect(SloveniaTinValidator.isCountrySupported("SI")).toBe(true);
        });

        it("should support SVN country code", () => {
            expect(SloveniaTinValidator.isCountrySupported("SVN")).toBe(true);
        });

        it("should support 705 country code", () => {
            expect(SloveniaTinValidator.isCountrySupported("705")).toBe(true);
        });

        it("should support lowercase country code", () => {
            expect(SloveniaTinValidator.isCountrySupported("si")).toBe(true);
        });

        it("should reject unsupported country code", () => {
            expect(SloveniaTinValidator.isCountrySupported("US")).toBe(false);
        });

        it("should reject empty country code", () => {
            expect(SloveniaTinValidator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate", () => {

        it("should reject null TIN", () => {
            expect(SloveniaTinValidator.validate(null)).toBe(false);
        });

        it("should reject empty TIN", () => {
            expect(SloveniaTinValidator.validate("")).toBe(false);
        });

        it("should reject TIN with less than 8 digits", () => {
            expect(SloveniaTinValidator.validate("1234567")).toBe(false);
        });

        it("should reject TIN with more than 8 digits", () => {
            expect(SloveniaTinValidator.validate("123456789")).toBe(false);
        });

        it("should reject TIN starting with zero", () => {
            expect(SloveniaTinValidator.validate("01234567")).toBe(false);
        });

        it("should reject alphabetic characters", () => {
            expect(SloveniaTinValidator.validate("1234567A")).toBe(false);
        });

        it("should reject special characters", () => {
            expect(SloveniaTinValidator.validate("123456@8")).toBe(false);
        });

        it("should reject whitespace-only TIN", () => {
            expect(SloveniaTinValidator.validate("        ")).toBe(false);
        });

        it("should reject negative TIN", () => {
            expect(SloveniaTinValidator.validate("-1234567")).toBe(false);
        });

        it("should reject TIN with country prefix", () => {
            expect(SloveniaTinValidator.validate("SI12345678")).toBe(false);
        });

        it("should reject invalid country-prefixed TIN", () => {
            expect(SloveniaTinValidator.validate("SI1234567")).toBe(false);
        });
    });
});