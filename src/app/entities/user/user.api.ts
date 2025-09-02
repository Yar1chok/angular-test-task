import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserApi {
  users = signal<User[]>([]);

  constructor(private http: HttpClient) {}

  fetchUsers(page = 1) {
    return this.http.get<{ data: User[]; total_pages: number }>(
      `https://reqres.in/api/users?page=${page}`
    );
  }

  fetchUser(id: number) {
    return this.http.get<{ data: User }>(`https://reqres.in/api/users/${id}`);
  }

  updateUser(id: number, payload: Partial<User>) {
    return this.http.put(`https://reqres.in/api/users/${id}`, payload);
  }

  deleteUser(id: number) {
    return this.http.delete(`https://reqres.in/api/users/${id}`);
  }
}
