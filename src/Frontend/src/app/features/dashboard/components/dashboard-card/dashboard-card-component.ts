import {Component, inject} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthApiService} from '../../../auth/services/auth-api.service';
import {InMemoryDataService} from '../../../auth/services/in-memory-data.service';
import {Router} from '@angular/router';

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
  private readonly router = inject(Router);

  async onSubmit(): Promise<void> {
    const authData = this.inMemoryDataService.getAuthData();
    if (authData?.token) {
      const logoutRequestDto = {token: authData.token};
      this.authApiService.logout(logoutRequestDto).subscribe();
    }
    await this.router.navigate(['/login']);
  }
}
