import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../../core/services/task-service';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule} from 'primeng/dropdown';


@Component({
  selector: 'app-task-form',

  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, 
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    ButtonModule,
  DropdownModule,
],
  templateUrl: './task-form.html',
    styleUrl: './task-form.scss'
})
 
 
export class TaskForm implements OnInit {
  form: FormGroup;
users: string[] = [];
userOptions: { label: string; value: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService:UserService,
    private router: Router,
    private toast: ToastService
  ) {
this.form = this.fb.group({
  title: ['', Validators.required],
  description: ['', Validators.required],
  assignedToUserId: [null, Validators.required],  // ✅ now ID
  dueDate: ['']
});


}





ngOnInit(): void {
  this.userService.getAllUsers().subscribe({
    next: (res) => {
      this.userOptions = res.map(u => ({
        label: u.username,
        value: u.id
      }));
    },
    error: () => this.toast.error('Failed to load users')
  });
}


  submit() {
    if (this.form.invalid) return;
    this.taskService.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => this.toast.error('Error creating task')
    });
  }
}


