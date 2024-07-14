import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task } from '../../../../shared/models/task.model';
import { selectAllTasks, selectTasksLoading } from '../../../../store/task.selectors';
import * as TaskActions from '../../../../store/task.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.loading$ = this.store.select(selectTasksLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
    this.store.select(selectAllTasks).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onDeleteTask(id: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  onUpdateTask(task: Task): void {
    this.store.dispatch(TaskActions.updateTask({ task }));
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    const newTasks = [...this.tasks];
    moveItemInArray(newTasks, event.previousIndex, event.currentIndex);
    this.store.dispatch(TaskActions.reorderTasks({ tasks: newTasks }));
  }

  openTaskDetails(taskId: string) {
    this.router.navigate(['/tasks', taskId]);
  }
}