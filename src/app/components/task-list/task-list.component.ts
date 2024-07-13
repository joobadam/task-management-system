import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { selectAllTasks, selectTasksLoading } from '../../store/task.selectors';
import * as TaskActions from '../../store/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
/*   styleUrls: ['./task-list.component.css'] */
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectTasksLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  onDeleteTask(id: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  onUpdateTask(task: Task): void {
    this.store.dispatch(TaskActions.updateTask({ task }));
  }
}