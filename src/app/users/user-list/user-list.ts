import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService,UserDto } from '../../core/services/user-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '../../core/services/toast-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  imports: [CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    TableModule,
    ButtonModule],
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {
  users: UserDto[] = [];
  loading = false;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef, private toast: ToastService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
     this.cdr.detectChanges();
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.loading = false;
        this.toast.error('Failed to load users');
         this.cdr.detectChanges();
      }
    });
  }

  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.toast.success('User deleted successfully');
      },
      error: () => {
        this.toast.error('Failed to delete user');
      }
    });
  }
}
