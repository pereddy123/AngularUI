import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { setUsername } from '../../state/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule, Header, Footer, MatSidenavModule,MatListModule,MatIconModule,MatToolbarModule,MatButtonModule,MatChipsModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})

export class MainLayout {
  username: string | null;
  role: string | null;


  constructor(private auth: AuthService, private router: Router,private store: Store) {
      this.username = this.auth.getUsername();
  this.role = this.auth.getUserRole();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

