import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  confirmacionContrasena: string = '';
  correoElectronico: string = '';
  registroExitoso: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {}

  registrarUsuario() {
    if (this.contrasena !== this.confirmacionContrasena) {
      //Agregar Feedback del error
      return;
    }

    const usuarioExistente = this.userService.getUserByUsername(this.usuario);
    if (usuarioExistente) {
      //Agregar Feedback del error
      return;
    }

    const userData = { Usuario: this.usuario };
    this.userService.saveUserData(userData); //Help

    const nuevoUsuario = {
      id: this.userService.generateUniqueId(),
      username: this.usuario,
      password: this.contrasena,
      email: this.correoElectronico,
      role: 'user',
    };

    this.userService.agregarUsuario(nuevoUsuario);
    if (this.userService.loginUser(this.usuario, this.contrasena)) {
      this.registroExitoso = true;
      this.router.navigate(['/home']);
    }
  }
}