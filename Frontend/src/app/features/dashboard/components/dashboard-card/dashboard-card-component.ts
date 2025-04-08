import {Component, inject} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {AuthApiService} from '../../../auth/services/auth-api.service';
import {InMemoryDataService} from '../../../auth/services/in-memory-data.service';

@Component({
  selector: 'app-dashboard-card',
  imports: [
    FormButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard-card-component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  private readonly authApiService = inject(AuthApiService);
  private readonly inMemoryDataService = inject(InMemoryDataService);

  async onSubmit(): Promise<void> {
    const authData = this.inMemoryDataService.getAuthData();

    if (!authData?.token) {
      return;
    }

    await firstValueFrom(this.authApiService.logout({token: authData.token}));
  }
}
