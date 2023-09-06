import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData: any = {
    Nombre: '',
    Apellido: '',
    NivelEducacion: '',
    FechaNacimiento: '',
  };

  constructor(
    private userService: UserService
  ) {}
  
  isLoggedIn() {
    const userData = this.userService.getUserData();
    return userData && userData.Usuario !== '';
  }

  get loggedInUserName() {
    const userData = this.userService.getUserData();
    return userData.Usuario;
  }


}
