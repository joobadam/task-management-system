import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule.forChild([{ path: '', component: LandingComponent }])
  ]
})
export class LandingModule { }