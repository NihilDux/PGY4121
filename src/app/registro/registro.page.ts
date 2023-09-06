import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { CommunicationService } from '../communication.service';//Sin usar aún
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
    private authService: AuthService,
    private userService: UserService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {}

  registrarUsuario() {
    if (this.contrasena !== this.confirmacionContrasena) {
      return;
    }

    const usuarioExistente = this.userService.getUserByUsername(this.usuario);
    if (usuarioExistente) {
      return;
    }

    const userData = { Usuario: this.usuario };
    this.userService.saveUserData(userData);

    const nuevoUsuario = {
      id: this.userService.generateUniqueId(),
      username: this.usuario,
      password: this.contrasena,
      email: this.correoElectronico,
      role: 'user',
    };

    this.userService.agregarUsuario(nuevoUsuario);
    if (this.authService.loginUser(this.usuario, this.contrasena)) {
      this.registroExitoso = true;
      this.router.navigate(['/home']);
    }
  }
}