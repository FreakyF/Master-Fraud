import {Component, Input} from '@angular/core';

@Component({
  selector: 'form-button',
  imports: [],
  templateUrl: './form-button.component.html',
  styleUrl: './form-button.component.css'
})
export class FormButtonComponent {
  @Input() label!: string;
}
