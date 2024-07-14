import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TaskActions from './task.actions';
import { Task } from '../shared/models/task.model';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
});

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({ ...state, loading: true })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => {
    return adapter.setAll(tasks, { ...state, loading: false });
  }),
  on(TaskActions.addTask, (state, { task }) => {
    return adapter.addOne(task, state);
  }),
  on(TaskActions.updateTask, (state, { task }) => {
    return adapter.updateOne({ id: task.id, changes: task }, state);
  }),
  on(TaskActions.deleteTask, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(TaskActions.reorderTasks, (state, { tasks }) => {
    return adapter.setAll(tasks, state);
  })

);

export const { selectAll, selectIds } = adapter.getSelectors();