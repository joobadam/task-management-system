import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../models/task.model';
import * as TaskActions from '../../store/task.actions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
/*   styleUrls: ['./task-form.component.css'] */
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['todo', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: uuidv4(),
        ...this.taskForm.value
      };
      this.store.dispatch(TaskActions.addTask({ task: newTask }));
      this.taskForm.reset({ status: 'todo' });
    }
  }
}