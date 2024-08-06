import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { StepperDialogComponent } from './stepper-dialog/stepper-dialog.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('2000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class LandingComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  openStepperDialog() {
    const dialogRef = this.dialog.open(StepperDialogComponent, {
      width: '90%',
      maxWidth: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.setUserAvatar(result);
        this.router.navigate(['/tasks']);
      }
    });
  }
}