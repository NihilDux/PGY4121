import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor(private userService: UserService) {}

  isLoggedIn() {
    return this.loggedIn;
  }
  
  loginUser(username: string, password: string) {
    const user = this.userService.getUserByUsername(username);

    if (user && user.password === password) {
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      return false;
    }
  }

  logout() {
    this.loggedIn = false;
  }
}
