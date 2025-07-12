import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseURL = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseURL);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseURL, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseURL}/${task._id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
