import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  avatarForm: FormGroup;
  avatarOptions = [
    { id: 1, url: 'assets/avatar1.png' },
    { id: 2, url: 'assets/avatar2.png' },
    { id: 3, url: 'assets/avatar3.png' },
    { id: 4, url: 'assets/avatar4.png' },
    { id: 5, url: 'assets/avatar5.png' },
    { id: 6, url: 'assets/avatar6.png' },
  ];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.avatarForm = this.fb.group({
      name: ['', Validators.required],
      avatarId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.avatarForm.valid) {
      const { name, avatarId } = this.avatarForm.value;
      const avatarUrl = this.avatarOptions.find(a => a.id === avatarId)?.url;
      this.userService.setUserAvatar({ name, avatarUrl: avatarUrl || '' });
      this.router.navigate(['/tasks']);
    }
  }

  get nameControl() {
    return this.avatarForm.get('name');
  }

  get avatarIdControl() {
    return this.avatarForm.get('avatarId');
  }
}