import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['todo', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const newTask: Task = {
        id: uuidv4(),
        title: formValue.title,
        description: formValue.description,
        status: formValue.status,
        date: new Date(formValue.date).toISOString().split('T')[0]
      };
      this.dialogRef.close(newTask);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}