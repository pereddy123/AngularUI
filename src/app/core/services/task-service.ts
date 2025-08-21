import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
  assignedToUsername: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'https://localhost:44392/api/tasks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.baseUrl);
  }

  getAssigned(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(`${this.baseUrl}/assigned`);
  }

  getById(id: number): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.baseUrl}/${id}`);
  }

updateStatus(id: number, newStatus: string) {
  return this.http.put(`${this.baseUrl}/${id}/status`, JSON.stringify(newStatus), {
    headers: { 'Content-Type': 'application/json' }
  });
}


  create(task: any) {
    return this.http.post(`${this.baseUrl}`, task);
  }

  addComment(taskId: number, commentText: string) {
    return this.http.post(`${this.baseUrl}/${taskId}/comments`, commentText, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getComments(taskId: number): Observable<{ commentText: string; timestamp: string; commentedBy: string }[]> {
    return this.http.get<{ commentText: string; timestamp: string; commentedBy: string }[]>(
      `${this.baseUrl}/${taskId}/comments`
    );
  }
}
