import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'


const routes: Routes = [
  { 
    path: '', 
    component: TaskListComponent,
    children: [
      { path: 'new', component: TaskFormComponent },
      { path: ':id', component: TaskDetailsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskItemComponent,
    TaskDetailsComponent
  ],
  imports: [
    SharedModule,
    MatBottomSheetModule,
    MatListModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class TaskManagerModule { }