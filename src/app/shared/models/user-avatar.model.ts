import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Observable } from 'rxjs';
import { UserAvatar, UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isOpen = false;
  userAvatar$: Observable<UserAvatar | null>;

  constructor(private userService: UserService) {
    this.userAvatar$ = this.userService.userAvatar$;
  }

  ngOnInit() {
    this.userService.loadUserAvatar();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}