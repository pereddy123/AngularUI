import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService,TaskDto } from '../../core/services/task-service';
import { AuthService } from '../../core/services/auth-service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  tasks: TaskDto[] = [];
  role: string | null = null;
  selectedStatus: string = '';
  allTasks: TaskDto[] = [];
  statusUpdates: { [taskId: number]: string } = {};

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.role = this.auth.getUserRole();

    if (this.role === 'Admin' || this.role === 'Manager') {
      this.taskService.getAll().subscribe(res => {
        this.allTasks = res;
        this.tasks = res;
        this.cdr.detectChanges();
      });
    } else if (this.role === 'Employee') {
      this.taskService.getAssigned().subscribe(res => {
        this.allTasks = res;
        this.tasks = res;

        // Initialize statusUpdates for each task
        this.tasks.forEach(task => {
          this.statusUpdates[task.id] = task.status;
        });

        this.cdr.detectChanges();
      });
    }
  }

  filterTasks() {
    if (!this.selectedStatus) {
      this.tasks = this.allTasks;
    } else {
      this.tasks = this.allTasks.filter(t => t.status === this.selectedStatus);
    }
  }

  updateTaskStatus(taskId: number) {
    const newStatus = this.statusUpdates[taskId];
    this.taskService.updateStatus(taskId, newStatus).subscribe({
      next: () => {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) task.status = newStatus;
        this.toast.success('Status updated');
      },
      error: () => {
        this.toast.error('Failed to update status');
      }
    });
  }
}