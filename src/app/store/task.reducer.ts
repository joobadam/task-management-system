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
    console.log('Reducer: loadTasksSuccess', tasks);
    return adapter.setAll(tasks, { ...state, loading: false });
  }),
  on(TaskActions.addTask, (state, { task }) => {
    console.log('Reducer: addTask', task);
    return adapter.addOne(task, state);
  }),
  on(TaskActions.updateTask, (state, { task }) => {
    console.log('Reducer: updateTask', task);
    return adapter.updateOne({ id: task.id, changes: task }, state);
  }),
  on(TaskActions.deleteTask, (state, { id }) => {
    console.log('Reducer: deleteTask', id);
    return adapter.removeOne(id, state);
  }),
  on(TaskActions.reorderTasks, (state, { tasks }) => {
    console.log('Reducer: reorderTasks', tasks);
    return adapter.setAll(tasks, state);
  }),
  on(TaskActions.saveTasksSuccess, (state) => {
    console.log('Reducer: saveTasksSuccess');
    return state;
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();