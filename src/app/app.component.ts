import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserAvatar, UserService } from './services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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