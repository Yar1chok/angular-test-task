import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  id: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
  token = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('https://reqres.in/api/login', { email, password });
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('https://reqres.in/api/register', {
      username,
      email,
      password,
    });
  }

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('auth_token', token);
  }

  loadToken() {
    const saved = localStorage.getItem('auth_token');
    if (saved) this.token.set(saved);
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('auth_token');
  }
}
