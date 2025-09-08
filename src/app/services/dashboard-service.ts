import { Injectable } from '@angular/core';
import { environment } from '../../app/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = `${environment.apiBaseUrl}/dashboard`;

  constructor(private http: HttpClient) {}

getSummaryUrl(role: string): string {
  
  // const baseUrl = 'https://workspherewebapp-d0cmhsd6hcgxbvck.canadacentral-01.azurewebsites.net/api/dashboard';

  switch (role) {
    case 'Admin':
      return `${this.baseUrl}/admin-summary`;
    case 'Manager':
      return `${this.baseUrl}/manager-summary`;
    default:
      return `${this.baseUrl}/employee-summary`;
  }
}

}
