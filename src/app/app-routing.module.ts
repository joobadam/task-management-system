import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule) },
  { path: 'tasks', loadChildren: () => import('./features/task-manager/task-manager.module').then(m => m.TaskManagerModule) },
  { path: 'schedule', loadChildren: () => import('./features/weekly-schedule/weekly-schedule.module').then(m => m.WeeklyScheduleModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
