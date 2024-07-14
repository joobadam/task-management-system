import { Injectable } from '@angular/core';
import { Task } from '../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly TASKS_KEY = 'tasks';

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.TASKS_KEY);
    if (tasksJson) {
      console.log('Tasks from localStorage:', JSON.parse(tasksJson));
    } else {
      console.log('No tasks found in localStorage');
    }
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  }
}