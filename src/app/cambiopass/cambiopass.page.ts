import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cambiopass',
  templateUrl: './cambiopass.page.html',
  styleUrls: ['./cambiopass.page.scss'],
})
export class CambiopassPage implements OnInit {
  nuevaContrasena: string = '';
  cambioContrasenaExitoso: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  cambioPass() {
    if (this.nuevaContrasena) {
      this.userService.cambioPass(this.nuevaContrasena);
      this.cambioContrasenaExitoso = true; // Marcamos el éxito del cambio de contraseña
    } else {
      // Manejar el caso en que la nueva contraseña sea inválida
    }
  }
}
