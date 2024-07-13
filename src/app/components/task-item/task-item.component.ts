import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Task } from '../../models/task.model';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
/*   styleUrls: ['./task-item.component.css'] */
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<Task>();

  constructor(private bottomSheet: MatBottomSheet) {}

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onStatusChange(newStatus: 'todo' | 'in-progress' | 'done'): void {
    this.update.emit({ ...this.task, status: newStatus });
  }

  openDetails(): void {
    this.bottomSheet.open(TaskDetailsComponent, {
      data: { task: this.task }
    });
  }
}