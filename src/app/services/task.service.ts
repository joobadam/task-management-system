import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(task: Task): Observable<Task> {
    this.tasks.push(task);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
    return of(task);
  }

  deleteTask(id: string): Observable<string> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(id);
  }
}