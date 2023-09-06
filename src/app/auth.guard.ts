import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Importa el servicio de autenticación

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // El usuario ha iniciado sesión, permitir el acceso a la ruta
      return true;
    } else {
      // El usuario no ha iniciado sesión, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
