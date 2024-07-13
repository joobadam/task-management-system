import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { LocalStorageService } from '../services/local-storage.service';
import { selectAllTasks } from './task.selectors';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() => {
        const tasks = this.localStorageService.getTasks();
        return of(TaskActions.loadTasksSuccess({ tasks }));
      })
    )
  );
  
  saveTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask, TaskActions.updateTask, TaskActions.deleteTask, TaskActions.reorderTasks),
      withLatestFrom(this.store.select(selectAllTasks)),
      map(([action, tasks]) => {
        this.localStorageService.saveTasks(tasks);
        return { type: '[Task] Save Tasks Success' };
      })
    )
  );


  constructor(
    private actions$: Actions,
    private store: Store,
    private localStorageService: LocalStorageService
  ) {}
}