import {AbstractControl, ValidationErrors} from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value || value.trim() === '') {
    return {empty: 'Email cannot be empty'};
  }

  const allowedRegex = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/; // NOSONAR
  if (!allowedRegex.test(value)) {
    return {
      invalidCharacters: "Email address is invalid"
    };
  }

  return null;
}
