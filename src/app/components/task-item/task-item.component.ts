import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
/*   styleUrls: ['./task-item.component.css'] */
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<Task>();

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onStatusChange(newStatus: 'todo' | 'in-progress' | 'done'): void {
    const updatedTask: Task = { ...this.task, status: newStatus };
    this.update.emit(updatedTask);
  }
}