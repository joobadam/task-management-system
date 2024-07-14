import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../../../shared/models/task.model';
import { selectAllTasks, selectTasksLoading } from '../../../../store/task.selectors';
import * as TaskActions from '../../../../store/task.actions';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {
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

  openTaskDetails(task: Task) {
    const config: MatBottomSheetConfig = {
      data: { task }
    };
    this.bottomSheet.open(TaskDetailsComponent, config);
  }

  openNewTaskForm() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(TaskActions.addTask({ task: result }));
      }
    });
  }
}