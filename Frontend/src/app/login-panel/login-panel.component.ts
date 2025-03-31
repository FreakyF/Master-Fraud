import {Component, OnInit} from '@angular/core';
import {FormButtonComponent} from '../form-button/form-button.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormTextInputComponent} from '../form-text-input/form-text-input.component';
import {FormPasswordInputComponent} from '../form-password-input/form-password-input.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'login-panel',
  imports: [
    FormButtonComponent,
    ReactiveFormsModule,
    FormTextInputComponent,
    FormPasswordInputComponent,
    NgOptimizedImage
  ],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.css'
})
export class LoginPanelComponent implements OnInit {
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  async onSubmit() {
    return Promise<void>;
  }
}
