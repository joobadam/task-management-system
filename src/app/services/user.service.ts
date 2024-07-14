import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserAvatar {
  name: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAvatarSubject = new BehaviorSubject<UserAvatar | null>(null);
  userAvatar$ = this.userAvatarSubject.asObservable();

  setUserAvatar(avatar: UserAvatar) {
    this.userAvatarSubject.next(avatar);
    localStorage.setItem('userAvatar', JSON.stringify(avatar));
  }

  getUserAvatar(): UserAvatar | null {
    return this.userAvatarSubject.value;
  }

  loadUserAvatar() {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      this.userAvatarSubject.next(JSON.parse(savedAvatar));
    }
  }
}