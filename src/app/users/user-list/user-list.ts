import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService,UserDto } from '../../core/services/user-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '../../core/services/toast-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  imports: [CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    TableModule,
    ButtonModule,
   DialogModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    FormsModule],
  styleUrl: './user-list.scss',
   providers: [ConfirmationService]
})
export class UserList implements OnInit {
  users: UserDto[] = [];
  loading = false;
  showDialog = false;
  userForm:FormGroup;
showEditDialog = false;
selectedUserId: number | null = null;
editUserForm:FormGroup;





roleOptions = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Employee', value: 'Employee' }
];


  constructor( private confirmationService:ConfirmationService, private fb: FormBuilder,private userService: UserService, private cdr: ChangeDetectorRef, private toast: ToastService) {
       this.userForm = this.fb.group({
  username: ['', Validators.required],
  password: ['', Validators.required],
  role: ['', Validators.required]
});
this.editUserForm = this.fb.group({
  username: [{ value: '', disabled: true }],
  password: [''],
  role: ['', Validators.required]
});

  }

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
addUser() {
  if (this.userForm.invalid) return;
 this.userService.createUser({
  ...this.userForm.value,
  role: this.userForm.value.role?.value ?? this.userForm.value.role
}).subscribe({
  next: () => {
    this.toast.success('User created successfully');
    this.showDialog = false;
    this.userForm.reset();
    this.loadUsers();
  },
  error: () => {
    this.toast.error('Failed to create user');
  }
});

}


openEditDialog(user: UserDto) {
  this.selectedUserId = user.id;
  this.editUserForm.patchValue({
    username: user.username,
    role: this.roleOptions.find(r => r.value === user.role),
    password: '' // reset password field
  });
  this.showEditDialog = true;
}
updateUser() {
  if (this.editUserForm.invalid || !this.selectedUserId) return;

  const updatedUser = {
    id: this.selectedUserId,
    username: this.editUserForm.getRawValue().username,
    password: this.editUserForm.value.password, // optional
    role: this.editUserForm.value.role?.value ?? this.editUserForm.value.role
  };

  this.userService.updateUser(updatedUser).subscribe({
    next: () => {
      this.toast.success('User updated successfully');
      this.showEditDialog = false;
      this.editUserForm.reset();
      this.loadUsers();
    },
    error: () => {
      this.toast.error('Failed to update user');
    }
  });
}



deleteUser(id: number) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this user?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.toast.success('User deleted successfully');
          this.loadUsers()
        },
        error: () => {
          this.toast.error('Failed to delete user');
        }
      });
    }
  });
}
 
}

