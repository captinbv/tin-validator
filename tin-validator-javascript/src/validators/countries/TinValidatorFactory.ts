
import { CountryTinValidator } from "./CountryTinValidator";
import { DefaultTinValidatorFactory } from "./DefaultTinValidatorFactory";

/**
 * Factory for CountryTinValidator instances.
 *
 * Provides methods to retrieve validators for specific countries,
 * access configured mappings, and create preconfigured builders.
 */
export interface TinValidatorFactory {

    /**
     * Gets all configured country-to-validator mappings.
     */
    getAllMappings(): ReadonlyMap<string, CountryTinValidator>;

    /**
     * Gets a validator for the specified country code.
     * Returns undefined if no validator is registered.
     */
    getValidatorFor(
        countryCode: string
    ): CountryTinValidator | undefined;

    /**
     * Gets a builder preconfigured with the current factory mappings.
     */
    toBuilder(): TinValidatorFactory.Builder;
}

/**
 * Builder specification for TinValidatorFactory.
 */
export namespace TinValidatorFactory {

    export interface Builder {

        /**
         * Builds the factory.
         */
        build(): DefaultTinValidatorFactory;

        /**
         * Maps the validator to all its supported country codes.
         */
        with(validator: CountryTinValidator): this;

        /**
         * Maps the validator to specified country codes.
         */
        with(
            validator: CountryTinValidator,
            ...countryCodes: string[]
        ): this;

        /**
         * Copies all mappings from another factory.
         */
        withAllFrom(factory: TinValidatorFactory): this;

        /**
         * Sets the default validator.
         */
        withDefault(
            validator: CountryTinValidator | undefined
        ): this;
    }
}
