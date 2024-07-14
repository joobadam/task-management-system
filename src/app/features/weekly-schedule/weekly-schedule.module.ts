import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WeeklyScheduleComponent } from './weekly-schedule.component';

const routes: Routes = [
  { path: '', component: WeeklyScheduleComponent }
];

@NgModule({
  declarations: [WeeklyScheduleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class WeeklyScheduleModule { }
