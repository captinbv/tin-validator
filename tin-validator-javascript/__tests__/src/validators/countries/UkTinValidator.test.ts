
import { UkTinValidator } from "../../../../src/validators/countries/UkTinValidator";

describe("UK TIN Validator", () => {

    describe("Numeric TIN validation", () => {
        it("should accept a 10-digit numeric TIN", () => {
            expect(UkTinValidator.validate("1234567890")).toBe(true);
        });

        it("should reject a 9-digit numeric TIN", () => {
            expect(UkTinValidator.validate("123456789")).toBe(false);
        });

        it("should reject an 11-digit numeric TIN", () => {
            expect(UkTinValidator.validate("12345678901")).toBe(false);
        });
    });

    describe("Alphanumeric TIN validation", () => {
        it("should accept a valid 2-letter and 6-digit TIN", () => {
            expect(UkTinValidator.validate("AB123456")).toBe(true);
        });

        it.each(["A", "B", "C", "D"])(
            "should accept a TIN with suffix %s",
            (suffix) => {
                expect(
                    UkTinValidator.validate(`AB123456${suffix}`)
                ).toBe(true);
            }
        );

        it("should reject a TIN with an invalid suffix", () => {
            expect(UkTinValidator.validate("AB123456E")).toBe(false);
        });

        it("should reject a TIN with more than one suffix", () => {
            expect(UkTinValidator.validate("AB123456AB")).toBe(false);
        });

        it("should reject a TIN with fewer than 6 digits", () => {
            expect(UkTinValidator.validate("AB12345")).toBe(false);
        });

        it("should reject a TIN with more than 6 digits", () => {
            expect(UkTinValidator.validate("AB1234567")).toBe(false);
        });
    });

    describe("Invalid prefix validation", () => {
        it.each(["GB", "NK", "TN", "ZZ"])(
            "should reject TIN starting with reserved prefix %s",
            (prefix) => {
                expect(
                    UkTinValidator.validate(`${prefix}123456`)
                ).toBe(false);
            }
        );
    });

    describe("Invalid character validation", () => {
        it("should reject a TIN starting with a numeric character", () => {
            expect(UkTinValidator.validate("1B123456")).toBe(false);
        });

        it("should reject a TIN with an invalid second character", () => {
            expect(UkTinValidator.validate("A1123456")).toBe(false);
        });

        it("should reject a TIN containing special characters", () => {
            expect(UkTinValidator.validate("AB12345@")).toBe(false);
        });

        it("should reject a TIN containing spaces", () => {
            expect(UkTinValidator.validate("AB 123456")).toBe(false);
        });
    });

    describe("Null and empty input validation", () => {
        it("should reject null TIN", () => {
            expect(UkTinValidator.validate(null)).toBe(false);
        });

        it("should reject an empty TIN", () => {
            expect(UkTinValidator.validate("")).toBe(false);
        });
    });

    describe("Country code validation", () => {
        it("should support GB country code", () => {
            expect(UkTinValidator.isCountrySupported("GB")).toBe(true);
        });

        it("should support GBR country code", () => {
            expect(UkTinValidator.isCountrySupported("GBR")).toBe(true);
        });

        it("should support numeric country code 826", () => {
            expect(UkTinValidator.isCountrySupported("826")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(UkTinValidator.isCountrySupported("US")).toBe(false);
        });
    });
});
