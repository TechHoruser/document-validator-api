import { Injectable } from '@nestjs/common';
import { DocumentValidatorService } from './DocumentValidatorService';

@Injectable()
export class SpanishDocumentValidatorService extends DocumentValidatorService {
  getCountryCode(): string {
    return 'ES';
  }

  getValidateMethodAndTypeList(): ({ type: string; validatorMethod: (document: string) => boolean; })[] {
    return [
      { type: 'NIE', validatorMethod: this.validateNie },
      { type: 'NIF', validatorMethod: this.validateNif },
      { type: 'CIF', validatorMethod: this.validateCif },
    ];
  }

  getAbailableTypesByCountry(countryCode: string): string[] {
    if (countryCode === 'ES') {
      return ['NIE', 'NIF', 'CIF'];
    }

    return ['NIE', 'CIF'];
  }

  validateNie(nie: string): boolean {
    const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;
    if (!nieRegex.test(nie)) return false;

    const nieNumeric = nie.replace('X', '0').replace('Y', '1').replace('Z', '2');

    return this.validateNif(nieNumeric);
  }

  validateNif(nif: string): boolean {
    const nifRegex = /^[0-9]{8}[A-Z]$/;
    if (!nifRegex.test(nif)) return false;

    const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    const number = parseInt(nif.slice(0, 8), 10);
    const letter = nif[8];

    return letter === letters[number % 23];
  }

  validateCif(cif: string): boolean {
    const cifRegex = /^([ABCDEFGHJNPQRSUVW])([0-9]{7})([0-9A-J])$/;

    let match = cif.match(cifRegex);
    let letter = match[1],
      numberAsString = match[2],
      control = match[3];

    let sum = 0;

    console.log(letter, numberAsString, control);

    for (let i = 0; i < numberAsString.length; i++) {
      console.log(i, numberAsString[i]);
      if (i % 2 === 0) {
        const number = Number(numberAsString[i]) * 2;
        console.log('+', number < 10 ? number : number - 9);
        sum += number < 10 ? number : number - 9;
      } else {
        const number = Number(numberAsString[i]);
        console.log('+', number);
        sum += number;
      }
      console.log(sum);
    }

    console.log(sum);
    console.log(sum % 10);
    let control_digit = (10 - sum % 10);
    let control_letter = 'JABCDEFGHI'.substring(control_digit, 1);

    if (letter.match(/[ABEH]/)) {
      return Number(control) === control_digit;
    }

    if (letter.match(/[KPQS]/)) {
      return control == control_letter;
    }

    return Number(control) == control_digit
      || control == control_letter;
  }
}
