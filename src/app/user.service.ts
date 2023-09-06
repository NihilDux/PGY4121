import { Injectable } from '@angular/core';
import { User } from './models/user.models';
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
    return this.storage.get('userData');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    this.storage.set('loggedIn', false);
    this.storage.remove('userData');
  }

  cambioPass(nuevaContrasena: string) {
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
    // Generar un ID autoincrementable para el nuevo usuario
    const newUserId = this.generateUniqueId();

    // Asignar el nuevo ID al usuario antes de agregarlo
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

  // Método para generar un ID autoincrementable
  generateUniqueId(): number {
    const lastUserId = this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
    return lastUserId + 1;
  }
}
