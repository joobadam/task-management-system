import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskItemComponent,
    TaskDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: TaskListComponent }]),
    DragDropModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatStepperModule,
    MatIconModule,
  ],
  exports: [TaskDetailsComponent]
})
export class TaskManagerModule { }