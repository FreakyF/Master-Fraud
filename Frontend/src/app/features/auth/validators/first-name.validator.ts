import {AbstractControl, ValidationErrors} from '@angular/forms';

export function firstNameValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value || value.trim() === '') {
    return {empty: 'First name cannot be empty'};
  }

  const allowedRegex = /^[\p{L} \-'.]+$/u;
  if (!allowedRegex.test(value)) {
    return {
      invalidCharacters: "First name contains invalid characters"
    };
  }

  if (value.length > 50) {
    return {maxLength: 'First name cannot exceed 50 characters'};
  }

  return null;
}
