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

@Component({
  selector: 'app-task-form',

  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, 
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    ButtonModule],
  templateUrl: './task-form.html',
    styleUrl: './task-form.scss'
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


