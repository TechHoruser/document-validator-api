import { Injectable } from '@nestjs/common';
import { SpanishDocumentValidatorService } from './validatorByCountry/SpanishDocumentValidatorService';
import { UsaDocumentValidatorService } from './validatorByCountry/UsaDocumentValidatorService';
import { DocumentValidatorService } from './validatorByCountry/DocumentValidatorService';

@Injectable()
export class DocumentsService {
  private validators: DocumentValidatorService[];

  constructor(
    readonly spanishValidator: SpanishDocumentValidatorService,
    readonly usaValidator: UsaDocumentValidatorService,
  ) {
    this.validators = [
      spanishValidator,
      usaValidator,
    ];
  }

  validateDocument(
    type: string,
    document: string,
    countryCode: string,
  ): boolean {
    const validator = this.getValidatorByCountryCode(countryCode);
    if (!validator) {
      throw new Error(`No validator found for country code: ${countryCode}`);
    }

    const validateMethod = validator.getValidateMethodByType(type);

    if (!validateMethod) {
      throw new Error(`No validate method found for document type: ${type}`);
    }

    return validateMethod(document);
  }

  getDetectedDocumentType(
    document: string,
    countryCode: string,
  ): string | null {
    const validator = this.getValidatorByCountryCode(countryCode);
    if (!validator) {
      throw new Error(`No validator found for country code: ${countryCode}`);
    }

    return validator.getDetectedDocumentType(document, null);
  }

  getDetectedDocumentTypeFromOriginCountry(
    originCountryCode: string,
    document: string,
    documentCountryCode: string,
  ): string | null {
    const validator = this.getValidatorByCountryCode(originCountryCode);
    if (!validator) {
      throw new Error(`No validator found for country code: ${originCountryCode}`);
    }

    const availableTypes = validator.getAbailableTypesByCountry(documentCountryCode);

    return validator.getDetectedDocumentType(document, availableTypes);
  }

  private getValidatorByCountryCode(countryCode: string): DocumentValidatorService | undefined {
    return this.validators.find(validator => validator.getCountryCode() === countryCode);
  }
}
