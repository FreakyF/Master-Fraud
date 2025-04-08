import {AbstractControl, ValidationErrors} from '@angular/forms';

export function totpValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value || value.trim() === '') {
    return {empty: 'Authentication code cannot be empty'};
  }

  const allowedRegex = /^\d+$/;
  if (!allowedRegex.test(value)) {
    return {
      invalidCharacters: "Authentication code contains invalid characters"
    };
  }

  if (value.length != 6) {
    return {minLength: 'Authentication code must be 6 digits long'};
  }

  return null;
}
