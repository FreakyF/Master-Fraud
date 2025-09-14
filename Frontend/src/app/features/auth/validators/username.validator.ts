import {AbstractControl, ValidationErrors} from '@angular/forms';

export function usernameValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value || value.trim() === '') {
    return {empty: 'Username cannot be empty'};
  }

  const allowedRegex = /^[A-Za-z0-9]+$/;
  if (!allowedRegex.test(value)) {
    return {
      invalidCharacters: "Username contains invalid characters"
    };
  }

  if (value.length < 5) {
    return {minLength: 'Username must be at least 5 characters long'};
  }

  if (value.length > 20) {
    return {maxLength: 'Username cannot exceed 20 characters'};
  }

  return null;
}
