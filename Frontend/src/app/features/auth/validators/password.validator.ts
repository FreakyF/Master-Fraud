import {AbstractControl, ValidationErrors} from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value || value.trim() === '') {
    return {empty: 'Password cannot be empty'};
  }

  const allowedRegex = /^\P{C}+$/u;
  if (!allowedRegex.test(value)) {
    return {invalidCharacters: 'Password contains invalid characters'};
  }

  if (value.length < 8) {
    return {minLength: 'Password must be at least 8 characters long'};
  }
  if (value.length > 20) {
    return {maxLength: 'Password cannot exceed 20 characters'};
  }
  const uppercaseRegex = /[A-Z]/;
  if (!uppercaseRegex.test(value)) {
    return {uppercase: 'Password must contain at least one uppercase letter'};
  }

  const lowercaseRegex = /[a-z]/;
  if (!lowercaseRegex.test(value)) {
    return {lowercase: 'Password must contain at least one lowercase letter'};
  }

  const digitRegex = /[0-9]/;
  if (!digitRegex.test(value)) {
    return {digit: 'Password must contain at least one digit'};
  }

  const specialCharRegex = /[^A-Za-z0-9]/;
  if (!specialCharRegex.test(value)) {
    return {special: 'Password must contain at least one special character'};
  }


  return null;
}
