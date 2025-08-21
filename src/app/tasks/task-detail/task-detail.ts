


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService,TaskDto } from '../../core/services/task-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '../../core/services/toast-service';
@Component({
  selector: 'app-task-detail',
 imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss'
})

export class TaskDetail implements OnInit {
  task: TaskDto | null = null;
  selectedStatus: string = '';
  newComment: string = '';
  comments: { commentText: string; timestamp: string; commentedBy: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getById(id).subscribe((data: TaskDto) => {
  this.task = data;
  this.selectedStatus = data.status;
});


    this.loadComments(id);
  }

  loadComments(taskId: number) {
    this.taskService.getComments(taskId).subscribe((res) => {
      this.comments = res;
    });
  }

  updateStatus() {
    if (!this.task) return;

    this.taskService.updateStatus(this.task.id, this.selectedStatus).subscribe({
      next: () =>   this.toast.success('Status Updated'),
      error: () =>  this.toast.error('Failed to update status')
    });
  }

  addComment() {
    if (!this.task || !this.newComment.trim()) return;

    this.taskService.addComment(this.task.id, this.newComment.trim()).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments(this.task!.id);
      },
      error: () => alert('Failed to add comment')
    });
  }
}
