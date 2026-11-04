
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX =
    /^(?:[123568][0-9]{8}|(?:45|7[0124579]|9[0189])[0-9]{7})$/;

const PORTUGAL_INVALID_CHARS = /[^0-9]/gi;

export const PortugalTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return ["PT", "PRT", "620"].includes(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        tin = sanitise(tin, "PT", PORTUGAL_INVALID_CHARS);

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        return isValidTin(tin);
    },
};

function isValidTin(tin: string): boolean {
    let total = 0;

    for (let i = 0; i < 8; i++) {
        total += Number(tin.charAt(i)) * (9 - i);
    }

    const mod11 = total % 11;

    const control = mod11 < 2 ? 0 : 11 - mod11;

    return control === Number(tin.charAt(8));
}
