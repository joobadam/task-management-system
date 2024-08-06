import { Component, Inject, Optional } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  task: Task;

  constructor(
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: { task: Task },
    private bottomSheetRef: MatBottomSheetRef<TaskDetailsComponent>
  ) {
    this.task = data?.task || {} as Task;
  }

  closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }
}