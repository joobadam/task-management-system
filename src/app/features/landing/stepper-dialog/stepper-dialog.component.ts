import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stepper-dialog',
  templateUrl: './stepper-dialog.component.html',
  styleUrls: ['./stepper-dialog.component.css']
})
export class StepperDialogComponent {
  avatarForm: FormGroup;
  avatarOptions = [
    { id: 1, url: 'assets/avatar1.png' },
    { id: 2, url: 'assets/avatar2.png' },
    { id: 3, url: 'assets/avatar3.png' },
    { id: 4, url: 'assets/avatar4.png' },
    { id: 5, url: 'assets/avatar5.png' },
    { id: 6, url: 'assets/avatar6.png' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StepperDialogComponent>
  ) {
    this.avatarForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      avatarId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.avatarForm.valid) {
      const { name, avatarId } = this.avatarForm.value;
      const avatarUrl = this.avatarOptions.find(a => a.id === avatarId)?.url;
      this.dialogRef.close({ name, avatarUrl: avatarUrl || '' });
    }
  }

  selectAvatar(id: number) {
    this.avatarForm.patchValue({ avatarId: id });
  }

  get nameControl(): AbstractControl {
    return this.avatarForm.get('name') as AbstractControl;
  }

  get avatarIdControl(): AbstractControl {
    return this.avatarForm.get('avatarId') as AbstractControl;
  }
}