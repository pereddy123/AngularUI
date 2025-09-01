

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectUsername } from '../../state/user/user.selectors'; // adjust path
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-header',
   imports: [CommonModule, RouterModule, MatToolbarModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  username: any;
  role: string | null;
username$: Observable<string | null> | undefined;


  constructor(private auth: AuthService, private router: Router,private store: Store<AppState>) {
  this.username = this.auth.getUsername();
  this.role = this.auth.getUserRole();
  
  }


ngOnInit(): void {
  this.username$ = this.store.select(selectUsername);
}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
