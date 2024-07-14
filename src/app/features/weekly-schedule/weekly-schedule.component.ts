import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { TaskDetailsComponent } from '../task-manager/components/task-details/task-details.component';
import { Task } from 'src/app/shared/models/task.model';
import { selectAllTasks } from 'src/app/store/task.selectors';
import * as TaskActions from 'src/app/store/task.actions';

interface DayTasks {
  day: string;
  tasks: Task[];
}

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {
  weekSchedule$: Observable<DayTasks[]>;
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet
  ) {
    this.weekSchedule$ = this.store.select(selectAllTasks).pipe(
      map(tasks => {
        console.log('Tasks received in component:', tasks);
        return this.getWeekSchedule(tasks);
      })
    );
  }

  ngOnInit() {
    console.log('WeeklyScheduleComponent initialized');
    this.store.dispatch(TaskActions.loadTasks());
    this.store.select(selectAllTasks).subscribe(tasks => {
      console.log('Task objects:', JSON.stringify(tasks, null, 2));
    });
  }

  getWeekSchedule(tasks: Task[]): DayTasks[] {
    return this.weekDays.map(day => {
      const dayTasks = this.getTasksForDay(day, tasks);
      console.log(`Tasks for ${day}:`, dayTasks);
      return { day, tasks: dayTasks };
    });
  }

  getTasksForDay(day: string, tasks: Task[]): Task[] {
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      const dayIndex = this.weekDays.indexOf(day);
      console.log(`Task: ${task.title}, Date: ${task.date}, TaskDay: ${taskDate.getDay()}, DayIndex: ${dayIndex}`);
      return taskDate.getDay() === (dayIndex + 1) % 7;
    });
  }

  openTaskDetails(task: Task) {
    const config: MatBottomSheetConfig = {
      data: { task }
    };
    this.bottomSheet.open(TaskDetailsComponent, config);
  }
}