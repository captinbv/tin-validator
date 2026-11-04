
import { PortugalTinValidator } from "../../../../src/validators/countries/PortugalTinValidator";

describe("PortugalTinValidator", () => {
    const validator = PortugalTinValidator;

    describe("isCountrySupported", () => {
        it("should support PT country code", () => {
            expect(validator.isCountrySupported("PT")).toBe(true);
        });

        it("should support PRT country code", () => {
            expect(validator.isCountrySupported("PRT")).toBe(true);
        });

        it("should support numeric country code 620", () => {
            expect(validator.isCountrySupported("620")).toBe(true);
        });

        it("should support lowercase country codes", () => {
            expect(validator.isCountrySupported("pt")).toBe(true);
            expect(validator.isCountrySupported("prt")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(validator.isCountrySupported("IT")).toBe(false);
            expect(validator.isCountrySupported("DE")).toBe(false);
            expect(validator.isCountrySupported("US")).toBe(false);
            expect(validator.isCountrySupported("FR")).toBe(false);
            expect(validator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate - Valid Portuguese TIN", () => {
        it("should accept a valid TIN starting with 1", () => {
            expect(validator.validate("123456789")).toBe(true);
        });

        it("should accept a valid TIN starting with 3", () => {
            expect(validator.validate("300000006")).toBe(true);
        });

        it("should accept a valid TIN starting with 5", () => {
            expect(validator.validate("500000000")).toBe(true);
        });

        it("should accept a valid TIN starting with 6", () => {
            expect(validator.validate("600000001")).toBe(true);
        });

        it("should accept a valid TIN starting with 8", () => {
            expect(validator.validate("800000005")).toBe(true);
        });

        it("should accept a valid TIN starting with 45", () => {
            expect(validator.validate("450000001")).toBe(true);
        });

        it("should accept a valid TIN starting with 7", () => {
            expect(validator.validate("700000003")).toBe(true);
        });
    });

    describe("validate - Invalid Portuguese TIN", () => {
        it("should reject an invalid TIN checksum", () => {
            expect(validator.validate("123456780")).toBe(false);
        });

        it("should reject a TIN shorter than 9 digits", () => {
            expect(validator.validate("12345678")).toBe(false);
        });

        it("should reject a TIN longer than 9 digits", () => {
            expect(validator.validate("1234567890")).toBe(false);
        });

        it("should reject a TIN starting with an invalid digit", () => {
            expect(validator.validate("023456789")).toBe(false);
            expect(validator.validate("423456789")).toBe(false);
        });

        it("should reject an invalid 45 prefix", () => {
            expect(validator.validate("460000001")).toBe(false);
        });

        it("should reject an invalid 7 prefix", () => {
            expect(validator.validate("730000003")).toBe(false);
        });

        it("should reject an invalid 9 prefix", () => {
            expect(validator.validate("920000001")).toBe(false);
        });

        it("should reject a TIN containing only zeros", () => {
            expect(validator.validate("000000000")).toBe(false);
        });

        it("should reject a TIN containing alphabetic characters", () => {
            expect(validator.validate("12345678A")).toBe(false);
        });
    });

    describe("validate - Invalid inputs", () => {
        it("should reject null", () => {
            expect(validator.validate(null)).toBe(false);
        });

        it("should reject an empty TIN", () => {
            expect(validator.validate("")).toBe(false);
        });

        it("should reject whitespace-only input", () => {
            expect(validator.validate("         ")).toBe(false);
        });

        it("should reject alphabetic input", () => {
            expect(validator.validate("ABCDEFGHI")).toBe(false);
        });

        it("should reject special characters only", () => {
            expect(validator.validate("!@#$%^&*()")).toBe(false);
        });

        it("should reject non-ASCII digits", () => {
            expect(validator.validate("１２３４５６７８９")).toBe(false);
        });
    });

    describe("validate - Sanitisation", () => {
        it("should validate a TIN after removing spaces", () => {
            expect(validator.validate("123 456 789")).toBe(true);
        });

        it("should validate a TIN after removing hyphens", () => {
            expect(validator.validate("1234-56789")).toBe(true);
        });

        it("should validate a TIN after removing multiple special characters", () => {
            expect(validator.validate("123-45-67-89")).toBe(true);
        });

        it("should reject a sanitised TIN with fewer than 9 digits", () => {
            expect(validator.validate("1234-5678")).toBe(false);
        });

        it("should reject a sanitised TIN with more than 9 digits", () => {
            expect(validator.validate("1234-567890")).toBe(false);
        });

        it("should reject a sanitised TIN with an invalid checksum", () => {
            expect(validator.validate("1234-56780")).toBe(false);
        });

        it("should reject a sanitised TIN with an invalid prefix", () => {
            expect(validator.validate("423-456-789")).toBe(false);
        });
    });
});
