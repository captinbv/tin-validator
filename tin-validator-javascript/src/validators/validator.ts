import {AustriaTinValidator} from "./countries/AustriaTinValidator";
import {BelgiumTinValidator} from "./countries/BelgiumTinValidator";
import {BulgariaTinValidator} from "./countries/BulgariaTinValidator";
import {CanadaTinValidator} from "./countries/CanadaTinValidator";
import {CroatiaTinValidator} from "./countries/CroatiaTinValidator";
import {CyprusTinValidator} from "./countries/CyprusTinValidator";
import {CzechiaTinValidator} from "./countries/CzechiaTinValidator";
import {DenmarkTinValidator} from "./countries/DenmarkTinValidator";
import {EstoniaTinValidator} from "./countries/EstoniaTinValidator";
import {FinlandTinValidator} from "./countries/FinlandTinValidator";
import {FranceTinValidator} from "./countries/FranceTinValidator";
import {GermanyTinValidator} from "./countries/GermanyTinValidator";
import {GreeceTinValidator} from "./countries/GreeceTinValidator";
import {ItalyTinValidator} from "./countries/ItalyTinValidator";
import {PortugalTinValidator} from "./countries/PortugalTinValidator";
import {RomaniaTinValidator} from "./countries/RomaniaTinValidator";
import {SloveniaTinValidator} from "./countries/SloveniaTinValidator";
import {SpainTinValidator} from "./countries/SpainTinValidator";
import {UkTinValidator} from "./countries/UkTinValidator";

const COUNTRIES = [
    AustriaTinValidator,
    BelgiumTinValidator,
    BulgariaTinValidator,
    CanadaTinValidator,
    CroatiaTinValidator,
    CyprusTinValidator,
    CzechiaTinValidator,
    DenmarkTinValidator,
    EstoniaTinValidator,
    FinlandTinValidator,
    FranceTinValidator,
    GermanyTinValidator,
    GreeceTinValidator,
    ItalyTinValidator,
    PortugalTinValidator,
    RomaniaTinValidator,
    SloveniaTinValidator,
    SpainTinValidator,
    UkTinValidator
]

export function validateTin(tin: string, countryCode: string): boolean {
    const countryValidator = COUNTRIES.find(validator => validator.isCountrySupported(countryCode));
    if (!countryValidator) {
        throw new Error(`No validator found for country code: ${countryCode}`);
    }
    return countryValidator.validate(tin);
}