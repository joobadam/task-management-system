import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WeeklyScheduleComponent } from './weekly-schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsComponent } from '../task-manager/components/task-details/task-details.component';

const routes: Routes = [
  { path: '', component: WeeklyScheduleComponent }
];

@NgModule({
  declarations: [WeeklyScheduleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class WeeklyScheduleModule { }