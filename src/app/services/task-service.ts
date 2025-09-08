import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{environment} from '../environments/environment'
import { TaskDto } from '../models/TaskDto';



@Injectable({ providedIn: 'root' })
export class TaskService {
  // // private baseUrl = 'https://workspherewebapp-d0cmhsd6hcgxbvck.canadacentral-01.azurewebsites.net/api/tasks';
 private baseUrl = `${environment.apiBaseUrl}/tasks`;
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
  updateFields(id: number, update: { status: string, progress: number, comment: string }) {
  return this.http.put(`${this.baseUrl}/${id}/fields`, update);
}

}
