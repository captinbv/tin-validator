
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const CNP_REGEX = /^[0-9]{13}$/;

const ROMANIA_INVALID_CHARS = /[^0-9]/gi;

const WEIGHTS = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];

export const RomaniaTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return ["RO", "ROU", "642"].includes(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        tin = sanitise(tin, "RO", ROMANIA_INVALID_CHARS);

        if (tin == null || !CNP_REGEX.test(tin)) {
            return false;
        }

        return isValidCnp(tin);
    },
};

function isValidCnp(tin: string): boolean {
    let sum = 0;

    for (let i = 0; i < 12; i++) {
        sum += Number(tin.charAt(i)) * WEIGHTS[i];
    }

    let checksum = sum % 11;

    if (checksum === 10) {
        checksum = 1;
    }

    return checksum === Number(tin.charAt(12));
}
