export abstract class DocumentValidatorService {
  abstract getCountryCode(): string;

  abstract getValidateMethodAndTypeList(): ({
    type: string;
    validatorMethod: (document: string) => boolean
  })[];

  abstract getAbailableTypesByCountry(countryCode: string): string[];

  getValidateMethodByType(type: string): ((document: string) => boolean) | null {
    const validateMethodAndType = this.getValidateMethodAndTypeList().find(
      (validateMethodAndType) => validateMethodAndType.type === type,
    );

    return validateMethodAndType ? validateMethodAndType.validatorMethod : null;
  }

  getDetectedDocumentType(document: string, availableTypes: string[] | null): string | null {
    const validateMethodAndTypeList = this.getValidateMethodAndTypeList();

    for (const validateMethodAndType of validateMethodAndTypeList) {
      if (availableTypes && !availableTypes.includes(validateMethodAndType.type)) {
        continue;
      }

      if (validateMethodAndType.validatorMethod(document)) {
        return validateMethodAndType.type;
      }
    }

    return null;
  }
}
