
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[1-9][0-9]{7}$/;

const WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3, 6];

export const SloveniaTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return ["SI", "SVN", "705"].includes(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        tin = sanitise(tin, "SI");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += (tin.charAt(i).charCodeAt(0) - 48) * WEIGHTS[i];
        }

        const checksum = (sum % 11) % 10;
        const control = tin.charAt(9).charCodeAt(0) - 48;

        return control === checksum;
    },
};
