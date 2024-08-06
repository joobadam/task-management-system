import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @Output() details = new EventEmitter<Task>();

  get cardColor(): string {
    switch(this.task.status) {
      case 'todo':
        return 'white';
      case 'in-progress':
        return 'gold';
      case 'done':
        return 'palegreen';
      default:
        return 'white';
    }
  }

  onStatusChange(newStatus: 'todo' | 'in-progress' | 'done') {
    const updatedTask: Task = { ...this.task, status: newStatus };
    this.update.emit(updatedTask);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  openDetails(event: Event) {
    event.stopPropagation();
    this.details.emit(this.task);
  }
}