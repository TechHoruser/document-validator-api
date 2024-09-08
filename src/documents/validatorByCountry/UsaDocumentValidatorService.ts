import { Injectable } from '@nestjs/common';
import { DocumentValidatorService } from './DocumentValidatorService';

@Injectable()
export class UsaDocumentValidatorService extends DocumentValidatorService {
  getCountryCode(): string {
    return 'US';
  }

  getValidateMethodAndTypeList(): ({ type: string; validatorMethod: (document: string) => boolean; })[] {
    return [
      { type: 'SSN', validatorMethod: this.validateSSN },
    ];
  }

  getAbailableTypesByCountry(countryCode: string): string[] {
    return ['SSN'];
  }

  validateSSN(ssn: string): boolean {
    let regex = new RegExp(/^(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/);
    return regex.test(ssn);
  }
}
