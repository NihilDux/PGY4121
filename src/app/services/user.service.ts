import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn: boolean = false;
  private users: User[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    const storedUsers = await this.storage.get('users');

    if (storedUsers) {
      this.users = storedUsers;
    }
  }

  saveUserData(userData: any) {
    this.loggedIn = true;
    this.storage.set('loggedIn', true);
    this.storage.set('userData', userData);
  }

 getUserData() { 
  //Por acá la posible solucion del HTML HOME con el usuario
    return this.storage.get('userData');
  }

  loginUser(username: string, password: string) {
    const user = this.getUserByUsername(username);

    if (user && user.password === password) {
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      return false;
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    this.storage.set('loggedIn', false);
  }

  cambioPass(nuevaContrasena: string) { //No funciona, aún
    if (this.isLoggedIn()) {
      this.storage.get('userData').then((userData) => {
        if (userData) {
          userData.password = nuevaContrasena;
          this.storage.set('userData', userData);
        }
      });
    }
  }

  agregarUsuario(usuario: User) {
    const newUserId = this.generateUniqueId();
    usuario.id = newUserId;

    this.users.push(usuario);
    this.storage.set('users', this.users);
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getAllUsers() {
    return this.storage.get('users');
  }

  generateUniqueId(): number {
    const lastUserId = this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
    return lastUserId + 1;
  }
}
