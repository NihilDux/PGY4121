import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any; // Propiedad para almacenar los datos del usuario autenticado

  allowedUsers: any[] = [];

  constructor() {}

  registerUser(newUser: any) {
    this.allowedUsers.push(newUser);
  }

  loginUser(username: string, password: string) {
    const foundUser = this.allowedUsers.find((user) => user.Usuario === username && user.Password === password);
    if (foundUser) {
      this.user = foundUser; // Almacena los datos del usuario autenticado
    }
    return foundUser;
  }

  logoutUser() {
    this.user = null; // Borra los datos del usuario al cerrar sesión
  }

  isLoggedIn() {
    return !!this.user; // Verifica si hay un usuario autenticado
  }

  getLoggedInUser() {
    return this.user; // Devuelve los datos del usuario autenticado
  }
}
