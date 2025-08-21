

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-header',
   imports: [CommonModule, RouterModule, MatToolbarModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  username: any;
  role: string | null;


  constructor(private auth: AuthService, private router: Router) {
  this.username = this.auth.getUsername();
  this.role = this.auth.getUserRole();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
