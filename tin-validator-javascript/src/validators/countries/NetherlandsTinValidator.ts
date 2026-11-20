import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{9}$/;

export const NetherlandsTinValidator: TinValidator = {

    isCountrySupported(countryCode: string): boolean {
        return ["NL", "NLD", "528"].includes(countryCode);
    },

    validate(tin: string | null): boolean {

        if (tin === null) {
            return false;
        }

        const value = sanitise(tin, "NL");

        if (value === null || !TIN_REGEX.test(value)) {
            return false;
        }

        let sum = 0;

        for (let i = 0; i < 8; i++) {
            sum += Number(value.charAt(i)) * (9 - i);
        }

        const remainder = sum % 11;

        if (remainder === 10) {
            return false;
        }

        return Number(value.charAt(8)) === remainder;
    }
};