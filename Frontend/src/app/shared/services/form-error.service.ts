import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  getFirstError(form: FormGroup): string {
    for (const control of Object.values(form.controls)) {
      if (control.invalid && control.errors) {
        const errorKeys = Object.keys(control.errors);
        if (errorKeys.length > 0) {
          return control.errors[errorKeys[0]] as string;
        }
      }
    }
    return '';
  }
}
