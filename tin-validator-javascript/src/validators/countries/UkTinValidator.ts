
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX =
    /^(?:[0-9]{10}|[A-CEF-HJ-PW-Z][A-CEF-HJ-NPW-Z][0-9]{6}[ABCD]?)$/;

const INVALID_PREFIXES = new Set([
    "GB",
    "NK",
    "TN",
    "ZZ",
]);

export const UkTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return ["GB", "GBR", "826"].includes(countryCode.toUpperCase());
    },

    validate: (tin: string | null): boolean => {
        if (tin == null || tin.trim() === "") {
            return false;
        }

        // Reject whitespace and special characters.
        if (/[^a-zA-Z0-9]/.test(tin)) {
            return false;
        }

        tin = sanitise(tin, "GB");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        if (/^[0-9]{10}$/.test(tin)) {
            return true;
        }

        const prefix = tin.substring(0, 2);

        return !INVALID_PREFIXES.has(prefix);
    },
};
