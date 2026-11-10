# TIN Validator

**TIN Validator** provides Tax Identification Number (TIN) validation for both **Java** and **JavaScript**, allowing the same validation rules to be used consistently across back-end and front-end applications.

This open-source project is currently supported by **Captin B.V.**

## About

This project is a continuation of the work started by the
[Nodens2k TIN Validators](https://github.com/Nodens2k/tin-validators) project.

We build upon that foundation by:

- 🌍 Adding support for more countries
- ☕ Providing a Java implementation for back-end validation
- 🌐 Providing an equivalent JavaScript implementation for front-end validation
- 🔄 Keeping validation rules and behavior consistent across both implementations
- 🧩 Supporting country-specific formats, checksums, and validation rules

This allows applications to validate a TIN in the browser while applying the
same validation logic again on the server.

## Scope and Limitations

TIN Validator performs **technical validation only**. Depending on the country
and TIN type, validation may include checks of the format, structure, length,
allowed characters and checksum.

A successful validation does **not** confirm that:

- the TIN has actually been issued or exists;
- the TIN is currently active or valid with a tax authority;
- the TIN belongs to a particular person or legal entity;
- the information associated with the TIN is correct or up to date; or
- use of the TIN satisfies KYC, AML, FATCA, CRS, tax reporting, customer due
  diligence or other legal, regulatory or compliance requirements.

Applications using this library remain responsible for performing any
additional verification or compliance checks required for their specific use
case.

## Supported by Captin B.V.

Development and maintenance of this project are currently supported by
**Captin B.V.**

Captin may contribute resources to maintenance, improvements and support for
additional countries. This support does not constitute a commitment to provide
continued development, updates, bug fixes, security fixes, availability,
support or support for any particular country or TIN format.

## Disclaimer

This software is provided under the Apache License 2.0 on an **"AS IS" basis,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND**, either express or implied.

Use of this software is at your own risk.

Neither **Captin B.V.** nor the project contributors guarantee the accuracy,
completeness or continued correctness of the validation rules or their
suitability for any particular purpose.

TIN formats, validation rules and regulatory requirements may change over
time. Users are responsible for determining whether the validation rules are
appropriate and sufficiently current for their intended use.

See the `LICENSE` file for the full license terms.

## License

This project builds upon the original Nodens2k work and is distributed under
the **Apache License 2.0**.

Copyright and license notices originating from third-party or open-source
components are retained where required by their respective licenses.

See the `LICENSE` file and, where applicable, the `NOTICE` file and other
third-party attribution information for the relevant license terms and
notices.

## Security

If you discover a security issue, please report it responsibly rather than
including sensitive information in a public issue.

See `SECURITY.md` for information on how to report security vulnerabilities.

## Maintenance

This project is maintained on a best-effort basis. There is no guarantee that
issues, pull requests, feature requests or requests for additional country
support will be addressed within a particular timeframe.

## Credits

Special thanks to the contributors of
[Nodens2k/tin-validators](https://github.com/Nodens2k/tin-validators) for the
original implementation and foundation on which this project is built.

Additional development and maintenance are currently supported by
**Captin B.V.**
