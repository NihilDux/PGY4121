import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  User: any = {};

  constructor(
    private userService: UserService,
    private router: Router,) {}

  async ngOnInit() {
    const userData = await this.userService.getUserData();
    this.User = userData;
  }

  cambiarPass() {
    this.router.navigate(['/cambiopass']);
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
