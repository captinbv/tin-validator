
import { TinValidator } from "../../types/validation";

export class DefaultTinValidatorFactory {
    private readonly validators: Map<string, TinValidator>;
    private readonly defaultValidator?: TinValidator;

    constructor(
        validators: Map<string, TinValidator>,
        defaultValidator?: TinValidator
    ) {
        this.validators = new Map(validators);
        this.defaultValidator = defaultValidator;
    }

    getAllMappings(): ReadonlyMap<string, TinValidator> {
        return new Map(this.validators);
    }

    getValidatorFor(countryCode: string): TinValidator | undefined {
        return this.validators.get(countryCode) ?? this.defaultValidator;
    }

    toBuilder(): DefaultTinValidatorFactoryBuilder {
        return DefaultTinValidatorFactory.builder()
            .withAllFrom(this)
            .withDefault(this.defaultValidator);
    }

    static builder(): DefaultTinValidatorFactoryBuilder {
        return new DefaultTinValidatorFactoryBuilder();
    }
}

export class DefaultTinValidatorFactoryBuilder {
    private readonly validators = new Map<string, TinValidator>();
    private defaultValidator?: TinValidator;

    with(validator: TinValidator): this {
        if (validator) {
            const countryCodes = [
                "AT", "BE", "BG", "CA", "HR", "CY",
                "CZ", "DK", "EE", "FI", "FR", "DE",
                "GR", "IT", "PT", "RO", "ES", "GB", "NL"
            ];

            countryCodes.forEach(countryCode => {
                if (validator.isCountrySupported(countryCode)) {
                    this.validators.set(countryCode, validator);
                }
            });
        }

        return this;
    }

    withCountries(
        validator: TinValidator,
        ...countryCodes: string[]
    ): this {
        if (validator) {
            countryCodes.forEach(countryCode => {
                this.validators.set(countryCode, validator);
            });
        }

        return this;
    }

    withAllFrom(factory: DefaultTinValidatorFactory | null): this {
        if (factory) {
            factory.getAllMappings().forEach((validator, country) => {
                this.validators.set(country, validator);
            });
        }

        return this;
    }

    withDefault(validator?: TinValidator): this {
        this.defaultValidator = validator;
        return this;
    }

    build(): DefaultTinValidatorFactory {
        return new DefaultTinValidatorFactory(
            this.validators,
            this.defaultValidator
        );
    }
}
