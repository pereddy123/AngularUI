import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service'
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { DashboardService } from '../../services/dashboard-service'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  role: any ;
  summary: any;

  totalUsers = 0;
  totalTasks = 0;

pieChartType: ChartType = 'pie';
pieChartData: ChartData<'pie', number[], string> = {
  labels: ['New', 'In Progress', 'Completed'],
  datasets: [
    {
      data: [0, 0, 0]
    }
  ]
};
  

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private dashboardService:DashboardService
  ) {}

  ngOnInit(): void {
    this.role = this.auth.getUserRole();
    this.loadSummary();
  }

  loadSummary() {
  const url = this.dashboardService.getSummaryUrl(this.role);

  this.http.get(url).subscribe({
    next: (res: any) => {
      this.summary = res;
      console.log(res);

      this.totalTasks = res.totalTasks ?? 0;
      this.totalUsers = res.totalUsers ?? 0;

      const newCount = res.new ?? 0;
      const inProgress = res.inProgress ?? 0;
      const completed = res.completed ?? 0;

      this.pieChartData = {
        labels: ['New', 'In Progress', 'Completed'],
        datasets: [{ data: [newCount, inProgress, completed] }]
      };

      console.log('Chart data:', this.pieChartData);
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Dashboard summary error:', err);
    }
  });
}

//   loadSummary() {
//     const url =
//       this.role === 'Admin'
//         ? 'https://localhost:44392/api/dashboard/admin-summary'
//         : this.role === 'Manager'
//         ? 'https://localhost:44392/api/dashboard/manager-summary'
//         : 'https://localhost:44392/api/dashboard/employee-summary';
//         //     ? 'https://workspherewebapp-d0cmhsd6hcgxbvck.canadacentral-01.azurewebsites.net/api/dashboard/admin-summary'
//         // : this.role === 'Manager'
//         // ? 'https://workspherewebapp-d0cmhsd6hcgxbvck.canadacentral-01.azurewebsites.net/api/dashboard/manager-summary'
//         // : 'https://workspherewebapp-d0cmhsd6hcgxbvck.canadacentral-01.azurewebsites.net/api/dashboard/employee-summary';

//    this.http.get(url).subscribe({
//   next: (res: any) => {
//     this.summary = res;
    
// console.log(res)
//     this.totalTasks = res.totalTasks ?? 0;
//     this.totalUsers = res.totalUsers ?? 0;

//     const newCount = res.new ?? 0;
//     const inProgress = res.inProgress ?? 0;
//     const completed = res.completed ?? 0;

//     this.pieChartData = {
//       labels: ['New', 'In Progress', 'Completed'],
//       datasets: [
//         {
//           data: [newCount, inProgress, completed]
//         }
//       ]
//     };

//     console.log('Chart data:', this.pieChartData);

//     this.cdr.detectChanges();
//   },
//   error: (err) => {
//     console.error('Dashboard summary error:', err);
//   }
// });

//   }
}
