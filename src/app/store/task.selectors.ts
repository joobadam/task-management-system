import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, selectAll } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  selectAll
);

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);