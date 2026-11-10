
import { RomaniaTinValidator } from "../../../../src/validators/countries/RomaniaTinValidator";

describe("RomaniaTinValidator", () => {

    describe("isCountrySupported", () => {
        it("should support RO country code", () => {
            expect(RomaniaTinValidator.isCountrySupported("RO")).toBe(true);
        });

        it("should support ROU country code", () => {
            expect(RomaniaTinValidator.isCountrySupported("ROU")).toBe(true);
        });

        it("should support 642 country code", () => {
            expect(RomaniaTinValidator.isCountrySupported("642")).toBe(true);
        });

        it("should support lowercase country code", () => {
            expect(RomaniaTinValidator.isCountrySupported("ro")).toBe(true);
        });

        it("should reject unsupported country code", () => {
            expect(RomaniaTinValidator.isCountrySupported("US")).toBe(false);
        });

        it("should reject empty country code", () => {
            expect(RomaniaTinValidator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate", () => {

        it("should accept valid CNP", () => {
            expect(RomaniaTinValidator.validate("1960523420017")).toBe(true);
        });

        it("should reject invalid checksum", () => {
            expect(RomaniaTinValidator.validate("1960523420018")).toBe(false);
        });

        it("should reject null TIN", () => {
            expect(RomaniaTinValidator.validate(null)).toBe(false);
        });

        it("should reject empty TIN", () => {
            expect(RomaniaTinValidator.validate("")).toBe(false);
        });

        it("should reject TIN with less than 13 digits", () => {
            expect(RomaniaTinValidator.validate("196052342001")).toBe(false);
        });

        it("should reject TIN with more than 13 digits", () => {
            expect(RomaniaTinValidator.validate("19605234200189")).toBe(false);
        });

        it("should reject alphabetic characters", () => {
            expect(RomaniaTinValidator.validate("19605234200AB")).toBe(false);
        });

        it("should reject all nines", () => {
            expect(RomaniaTinValidator.validate("9999999999999")).toBe(false);
        });

        it("should reject whitespace-only TIN", () => {
            expect(RomaniaTinValidator.validate("             ")).toBe(false);
        });

        it("should accept CNP with Romanian country prefix", () => {
            expect(RomaniaTinValidator.validate("RO1960523420017")).toBe(true);
        });

        it("should reject CNP with invalid checksum and country prefix", () => {
            expect(RomaniaTinValidator.validate("RO1960523420018")).toBe(false);
        });

        it("should accept CNP with embedded whitespace after sanitization", () => {
            expect(RomaniaTinValidator.validate("196052342 0017")).toBe(true);
        });

        it("should accept CNP with special characters after sanitization", () => {
            expect(RomaniaTinValidator.validate("196-052-342-0017")).toBe(true);
        });

        it("should accept all zeros based on checksum", () => {
            expect(RomaniaTinValidator.validate("0000000000000")).toBe(true);
        });

        it("should validate checksum remainder 10", () => {
            expect(RomaniaTinValidator.validate("5000000000001")).toBe(true);
        });

        it("should reject incorrect checksum when remainder is 10", () => {
            expect(RomaniaTinValidator.validate("5000000000002")).toBe(false);
        });

        it("should reject incorrect checksum when expected checksum is zero", () => {
            expect(RomaniaTinValidator.validate("0000000000001")).toBe(false);
        });
    });
});
