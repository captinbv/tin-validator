
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const CIF_REGEX = /^([ABCDEFGHJNPQRSUVW])([0-9]{7})([A-J0-9])$/;

const NIF_REGEX = /^([0-9KLMXYZ])([0-9]{7,8})([TRWAGMYFPDXBNJZSQVHLCKE])$/;

const NIF_DIGITS = "TRWAGMYFPDXBNJZSQVHLCKE";

const CIF_DIGITS = ["0123456789", "JABCDEFGHI"];

export const SpainTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return ["ES", "ESP", "724"].includes(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        tin = sanitise(tin, "ES");

        if (tin == null || tin.length === 0) {
            return false;
        }

        switch (tin.charAt(0)) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "K":
            case "L":
            case "M":
            case "X":
            case "Y":
            case "Z":
                return isValidNif(tin);

            case "A":
            case "B":
            case "C":
            case "D":
            case "E":
            case "F":
            case "G":
            case "H":
            case "J":
            case "P":
            case "Q":
            case "R":
            case "S":
            case "U":
            case "V":
            case "N":
            case "W":
                return isValidCif(tin);

            default:
                return false;
        }
    },
};

function isValidCif(nif: string): boolean {
    const match = nif.match(CIF_REGEX);

    if (match) {
        const num = match[2];

        let sum = 0;
        const len = num.length;

        for (let i = 0; i < len; i++) {
            const tmp = (2 - i % 2) * (Number(num.charAt(i)));
            sum += Math.floor(tmp / 10) + (tmp % 10);
        }

        const index = 10 - (sum % 10);

        const type = match[1].charAt(0);
        const control = match[3].charAt(0);

        switch (type) {
            case "A":
            case "B":
            case "E":
            case "H":
                return control === CIF_DIGITS[0].charAt(index);

            case "K":
            case "P":
            case "Q":
            case "S":
                return control === CIF_DIGITS[1].charAt(index);

            default:
                return control ===
                    CIF_DIGITS[
                        control >= "0" && control <= "9" ? 0 : 1
                        ].charAt(index);
        }
    }

    return false;
}

function isValidNif(nif: string): boolean {
    const match = nif.match(NIF_REGEX);

    if (match) {
        const number = parseNifNumber(
            match[1].charAt(0),
            match[2]
        );

        const control = match[3].charAt(0);

        return control === NIF_DIGITS.charAt(
            number % NIF_DIGITS.length
        );
    }

    return false;
}

function parseNifNumber(type: string, num: string): number {
    let number: string;

    if (type >= "0" && type <= "9") {
        number = type + num;
    } else if (type === "Y") {
        number = "1" + num;
    } else if (type === "Z") {
        number = "2" + num;
    } else {
        number = num;
    }

    return parseInt(number, 10);
}
