import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly TASKS_KEY = 'tasks';

  constructor() { }

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.TASKS_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  }
}