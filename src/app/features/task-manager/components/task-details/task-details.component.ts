import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'] 
})
export class TaskDetailsComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { task: Task },
    private bottomSheetRef: MatBottomSheetRef<TaskDetailsComponent>
  ) {}

  closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }
}