import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from './recource.model';

@Injectable({ providedIn: 'root' })
export class RecourceApi {
  resources = signal<Resource[]>([]);

  constructor(private http: HttpClient) {}

  fetchResources(page = 1): Observable<{ data: Resource[]; total_pages: number }> {
    return this.http.get<{ data: Resource[]; total_pages: number }>(
      `https://reqres.in/api/unknown?page=${page}`
    );
  }
}
