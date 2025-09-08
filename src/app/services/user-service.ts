import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/UserDto';
import{ environment } from '../environments/environment'

@Injectable({ providedIn: 'root' })
export class UserService {
  // private baseUrl = 'https://workspherewebapp-d0cmhsd6hcgxbvck.canadacentral-01.azurewebsites.net/api/users';
private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.baseUrl);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  createUser(user: { username: string; password: string; role: string }) {
  return this.http.post<UserDto>(`${this.baseUrl}`, user);
}

addUser(user: { username: string; password: string; role: string }) {
  return this.http.post(this.baseUrl, user);
}

updateUser(user: any) {
  return this.http.put(`${this.baseUrl}/${user.id}`, user);
}




}
