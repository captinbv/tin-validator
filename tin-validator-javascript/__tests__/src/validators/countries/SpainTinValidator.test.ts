
import { SpainTinValidator } from "../../../../src/validators/countries/SpainTinValidator";

describe("SpainTinValidator", () => {

    describe("isCountrySupported", () => {

        it("should support ES country code", () => {
            expect(SpainTinValidator.isCountrySupported("ES")).toBe(true);
        });

        it("should support ESP country code", () => {
            expect(SpainTinValidator.isCountrySupported("ESP")).toBe(true);
        });

        it("should support 724 country code", () => {
            expect(SpainTinValidator.isCountrySupported("724")).toBe(true);
        });

        it("should support lowercase country code", () => {
            expect(SpainTinValidator.isCountrySupported("es")).toBe(true);
        });

        it("should reject unsupported country code", () => {
            expect(SpainTinValidator.isCountrySupported("US")).toBe(false);
        });

        it("should reject empty country code", () => {
            expect(SpainTinValidator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate", () => {

        it("should reject null TIN", () => {
            expect(SpainTinValidator.validate(null)).toBe(false);
        });

        it("should reject empty TIN", () => {
            expect(SpainTinValidator.validate("")).toBe(false);
        });

        // NIF validation

        it("should accept valid NIF", () => {
            expect(SpainTinValidator.validate("12345678Z")).toBe(true);
        });

        it("should reject invalid NIF checksum", () => {
            expect(SpainTinValidator.validate("12345678A")).toBe(false);
        });

        it("should accept valid NIF with K prefix", () => {
            expect(SpainTinValidator.validate("K0000000T")).toBe(true);
        });

        it("should accept valid NIF with L prefix", () => {
            expect(SpainTinValidator.validate("L0000000T")).toBe(true);
        });

        it("should accept valid NIF with M prefix", () => {
            expect(SpainTinValidator.validate("M0000000T")).toBe(true);
        });

        // NIE validation

        it("should accept valid NIE with X prefix", () => {
            expect(SpainTinValidator.validate("X0000000T")).toBe(true);
        });

        it("should accept valid NIE with Y prefix", () => {
            expect(SpainTinValidator.validate("Y0000000Z")).toBe(true);
        });

        it("should accept valid NIE with Z prefix", () => {
            expect(SpainTinValidator.validate("Z0000000M")).toBe(true);
        });

        it("should reject invalid NIE checksum", () => {
            expect(SpainTinValidator.validate("X0000000A")).toBe(false);
        });

        // CIF validation

        it("should accept valid CIF with numeric control", () => {
            expect(SpainTinValidator.validate("A12345674")).toBe(true);
        });

        it("should accept valid CIF with alphabetic control", () => {
            expect(SpainTinValidator.validate("P1234567D")).toBe(true);
        });

        it("should reject invalid CIF checksum", () => {
            expect(SpainTinValidator.validate("A12345671")).toBe(false);
        });

        it("should reject invalid CIF format", () => {
            expect(SpainTinValidator.validate("A12345678")).toBe(false);
        });

        it("should reject CIF with invalid first character", () => {
            expect(SpainTinValidator.validate("I12345670")).toBe(false);
        });

        // Length validation

        it("should reject TIN with less than 9 characters", () => {
            expect(SpainTinValidator.validate("1234567Z")).toBe(false);
        });

        it("should reject TIN with more than 9 characters", () => {
            expect(SpainTinValidator.validate("123456789Z")).toBe(false);
        });

        // Invalid characters

        it("should reject alphabetic characters in invalid format", () => {
            expect(SpainTinValidator.validate("ABCDEFGHZ")).toBe(false);
        });

        it("should reject special characters", () => {
            expect(SpainTinValidator.validate("1234567@Z")).toBe(false);
        });

        it("should reject whitespace-only TIN", () => {
            expect(SpainTinValidator.validate("         ")).toBe(false);
        });

        it("should reject negative TIN", () => {
            expect(SpainTinValidator.validate("-12345678")).toBe(false);
        });

        // Country prefix validation

        it("should accept NIF with country prefix", () => {
            expect(SpainTinValidator.validate("ES12345678Z")).toBe(true);
        });

        it("should accept NIE with country prefix", () => {
            expect(SpainTinValidator.validate("ESX0000000T")).toBe(true);
        });

        it("should accept CIF with country prefix", () => {
            expect(SpainTinValidator.validate("ESA12345674")).toBe(true);
        });

        it("should accept CIF with alphabetic control and country prefix", () => {
            expect(SpainTinValidator.validate("ESP1234567D")).toBe(true);
        });

        it("should reject invalid NIF with country prefix", () => {
            expect(SpainTinValidator.validate("ES12345678A")).toBe(false);
        });

        it("should reject invalid CIF with country prefix", () => {
            expect(SpainTinValidator.validate("ESA12345671")).toBe(false);
        });
    });
});
