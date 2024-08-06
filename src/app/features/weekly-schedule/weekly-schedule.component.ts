import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  styleUrls: ['./weekly-schedule.component.css']
})
export class WeeklyScheduleComponent implements OnInit {
  weekSchedule$: Observable<DayTasks[]>;
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet
  ) {
    this.weekSchedule$ = this.store.select(selectAllTasks).pipe(
      map(tasks => this.getWeekSchedule(tasks))
    );
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  getWeekSchedule(tasks: Task[]): DayTasks[] {
    return this.weekDays.map(day => ({
      day,
      tasks: this.getTasksForDay(day, tasks)
    }));
  }

  getTasksForDay(day: string, tasks: Task[]): Task[] {
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      const dayIndex = this.weekDays.indexOf(day);
      return taskDate.getDay() === (dayIndex + 7) % 7;
    });
  }

  openTaskDetails(task: Task) {
    const config: MatBottomSheetConfig = {
      data: { task }
    };
    this.bottomSheet.open(TaskDetailsComponent, config);
  }
}