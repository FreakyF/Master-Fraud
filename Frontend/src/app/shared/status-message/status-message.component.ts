import {Component, Input} from '@angular/core';

@Component({
  selector: 'status-message',
  imports: [],
  templateUrl: './status-message.component.html',
  styleUrl: './status-message.component.css'
})
export class StatusMessageComponent {
  @Input() status: string = '';
}
