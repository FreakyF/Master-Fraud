import {AbstractControl, ValidationErrors} from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value || value.trim() === '') {
    return {empty: 'Password cannot be empty'};
  }

  const allowedRegex = /^\P{C}+$/u;
  if (!allowedRegex.test(value)) {
    return {
      invalidCharacters: "Password contains invalid characters"
    };
  }

  if (value.length < 8) {
    return {minLength: 'Password must be at least 8 characters long'};
  }

  if (value.length > 20) {
    return {maxLength: 'Password cannot exceed 20 characters'};
  }

  return null;
}
