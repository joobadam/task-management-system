import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

import { selectAllTasks } from '../../store/task.selectors';

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrl: './weekly-schedule.component.scss'
})


export class WeeklyScheduleComponent implements OnInit {
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  tasks$: Observable<Task[]>;

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  ngOnInit() {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  getTaskDay(date: string): string {
    if (!date) return '';
    const dayIndex = new Date(date).getDay();
    return this.weekDays[dayIndex === 0 ? 6 : dayIndex - 1];
  }
}
