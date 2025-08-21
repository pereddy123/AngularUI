import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('WorkSphere');
   constructor(private authService: AuthService, private router: Router) {}
     get showLayout(): boolean {
    const current = this.router.url;
    return !current.includes('/login'); // add more routes as needed
  }
 logout() {
  localStorage.removeItem('jwt_token');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}





