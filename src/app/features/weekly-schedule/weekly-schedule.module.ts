import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WeeklyScheduleComponent } from './weekly-schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';


const routes: Routes = [
  { path: '', component: WeeklyScheduleComponent }
];

@NgModule({
  declarations: [WeeklyScheduleComponent],
  imports: [
    SharedModule,
    MatCardModule,
    MatChipsModule,
    RouterModule.forChild(routes)
  ],
})
export class WeeklyScheduleModule { }