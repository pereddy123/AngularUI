import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../../core/services/task-service';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './task-form.html',
})
 
 
export class TaskForm implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    assignedToUserId: [null, Validators.required],
    dueDate: ['']
  });}

  ngOnInit(): void {}

  submit() {
    if (this.form.invalid) return;
    this.taskService.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => this.toast.error('Error creating task')
    });
  }
}


