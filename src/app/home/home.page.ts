import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedInUser: any = {}; // Inicializa loggedInUser como un objeto vacío

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    const userData = await this.userService.getUserData();
    this.loggedInUser = userData; // Asigna los datos del usuario a loggedInUser
  }

  cambiarPass() {
    this.router.navigate(['/cambiopass']);
  }
}
