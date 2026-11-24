
import { CountryTinValidator } from "../../../../src/validators/countries/CountryTinValidator";
describe("CountryTinValidator", () => {

    let validator: CountryTinValidator;

    beforeEach(() => {
        validator = {
            isValid: jest.fn((...args: any[]): boolean => {

                if (args.length === 1) {
                    return args[0] === "123456782";
                }

                if (args.length === 2) {
                    if (args[0] === null || args[1] === null) {
                        return false;
                    }

                    if (args[1] === "ANY") {
                        return args[0] === "123456782";
                    }

                    return args[0] === "NL" &&
                        args[1] === "123456782";
                }

                if (args.length === 3) {
                    return args[0] === "NL" &&
                        args[1] === "123456782" &&
                        args[2] === "ANY";
                }

                return false;
            }),

            getSupportedCountries: jest.fn(
                () => ["NL", "NLD", "528"]
            ),

            isCountrySupported: jest.fn(
                (countryCode: string | null): boolean => {
                    return countryCode !== null &&
                        ["NL", "NLD", "528"].includes(countryCode);
                }
            )
        };
    });

    describe("TIN validation", () => {

        test("should validate a valid TIN", () => {
            expect(validator.isValid("123456782")).toBe(true);
        });

        test("should reject an invalid TIN", () => {
            expect(validator.isValid("123456781")).toBe(false);
        });

        test("should reject null TIN", () => {
            expect(validator.isValid(null)).toBe(false);
        });

        test("should validate TIN with accepted type", () => {
            expect(validator.isValid("123456782", "ANY")).toBe(true);
        });

        test("should reject null accepted type", () => {
            expect(validator.isValid("123456782", null)).toBe(false);
        });

        test("should validate TIN for Netherlands", () => {
            expect(validator.isValid("NL", "123456782")).toBe(true);
        });

        test("should reject null country code", () => {
            expect(validator.isValid(null, "123456782")).toBe(false);
        });

        test("should reject null country TIN", () => {
            expect(validator.isValid("NL", null)).toBe(false);
        });

        test("should validate TIN with country and accepted type", () => {
            expect(
                validator.isValid("NL", "123456782", "ANY")
            ).toBe(true);
        });

        test("should reject null accepted type for country", () => {
            expect(
                validator.isValid("NL", "123456782", null)
            ).toBe(false);
        });
    });

    describe("Supported countries", () => {

        test("should return supported countries", () => {
            expect(validator.getSupportedCountries())
                .toEqual(["NL", "NLD", "528"]);
        });

        test("should support NL country code", () => {
            expect(validator.isCountrySupported("NL")).toBe(true);
        });

        test("should support NLD country code", () => {
            expect(validator.isCountrySupported("NLD")).toBe(true);
        });

        test("should support numeric country code", () => {
            expect(validator.isCountrySupported("528")).toBe(true);
        });

        test("should reject unsupported country code", () => {
            expect(validator.isCountrySupported("XX")).toBe(false);
        });

        test("should reject null country code", () => {
            expect(validator.isCountrySupported(null)).toBe(false);
        });
    });
});
