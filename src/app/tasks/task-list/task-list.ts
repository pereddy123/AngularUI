import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService,TaskDto } from '../../core/services/task-service';
import { AuthService } from '../../core/services/auth-service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule} from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-task-list',
 
  imports: [CommonModule,FormsModule, RouterModule, TableModule,DropdownModule,ButtonModule],
  templateUrl: './task-list.html',
    styleUrl: './task-list.scss'
})
export class TaskList implements OnInit {
  tasks: TaskDto[] = [];
  role: string | null = null;
  selectedStatus: string = '';
  allTasks: TaskDto[] = [];
  statusUpdates: { [taskId: number]: string } = {};
  statusOptions = [
  { label: 'All', value: '' },
  { label: 'New', value: 'New' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' }
];
taskSnapshot: { [taskId: number]: { status: string; progress: number; comment: string } } = {};



  constructor(
    private ngZone: NgZone,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
  
    this.role = this.auth.getUserRole();

    if (this.role === 'Admin' || this.role === 'Manager') {
      this.taskService.getAll().subscribe(res => {
  setTimeout(() => {
    this.allTasks = res;
    this.tasks = res;
      this.cdr.detectChanges();
  });
});
    } else if (this.role === 'Employee') {
      this.taskService.getAssigned().subscribe(res => {
  this.ngZone.run(() => {
    this.allTasks = res;
    this.tasks = res;

    this.tasks.forEach(task => {
      this.taskSnapshot[task.id] = {
        status: task.status,
        progress: task.progress,
        comment: task.comment
      };
    });
  });
});

    }
  }

updateTask(task: TaskDto) {
  const original = this.taskSnapshot[task.id];

  // Only send if something changed
  if (
    task.status !== original.status ||
    task.progress !== original.progress ||
    task.comment !== original.comment
  ) {
    const payload = {
      status: task.status ?? original.status,
      progress: task.progress ?? original.progress,
      comment: task.comment ?? original.comment
    };

    this.taskService.updateFields(task.id, payload).subscribe({
      next: () => {
        this.toast.success('Task updated');
        // update snapshot
        this.taskSnapshot[task.id] = { ...payload };
      },
      error: () => this.toast.error('Failed to update task')
    });
  }
}

}