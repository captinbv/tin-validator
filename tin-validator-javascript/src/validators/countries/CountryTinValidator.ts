
export type TinType = "ANY";

export interface CountryTinValidator {
    isValid(tin: string | null): boolean;

    isValid(
        tin: string | null,
        acceptedType: TinType | null
    ): boolean;

    isValid(
        countryCode: string | null,
        tin: string | null
    ): boolean;

    isValid(
        countryCode: string | null,
        tin: string | null,
        acceptedType: TinType | null
    ): boolean;

    getSupportedCountries(): readonly string[];

    isCountrySupported(countryCode: string | null): boolean;
}
