import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommunicationService } from '../communication.service';

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
    private communicationService: CommunicationService
  ) {}

  ngOnInit() {}

  registrarUsuario() {
    if (this.contrasena !== this.confirmacionContrasena) {
      return;
    }

    console.log('PASO -1 OK');

    const usuarioExistente = this.userService.getUserByUsername(this.usuario);
    if (usuarioExistente) {
      return;
    }

    console.log('PASO 0 OK');

    const userData = { Usuario: this.usuario };
    this.userService.saveUserData(userData);

    console.log('PASO 1 OK');

    // Generar un ID autoincrementable para el nuevo usuario
    const nuevoUsuario = {
      id: this.userService.generateUniqueId(), // Incrementa el contador y usa el valor como ID
      username: this.usuario,
      password: this.contrasena,
      email: this.correoElectronico,
      role: 'user', // Define el rol del usuario si es necesario
    };
    console.log('PASO 2 OK');
    console.log(nuevoUsuario)

    // Agregar el usuario a través del servicio de usuarios
    this.userService.agregarUsuario(nuevoUsuario);
    console.log('PASO 3 OK');

    // También puedes enviar los datos al componente de inicio de sesión usando el servicio de comunicación
    this.communicationService.sendUserData(nuevoUsuario);
    console.log('PASO 4 OK');

    this.registroExitoso = true;
    this.router.navigate(['/home']);
  }
}
