import {AbstractControl, ValidationErrors} from '@angular/forms';

export function lastNameValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value || value.trim() === '') {
    return {empty: 'Last name cannot be empty'};
  }

  const allowedRegex = /^[\p{L} \-'.]+$/u;
  if (!allowedRegex.test(value)) {
    return {
      invalidCharacters: "Last name contains invalid characters"
    };
  }

  if (value.length > 100) {
    return {maxLength: 'Last name cannot exceed 100 characters'};
  }

  return null;
}
