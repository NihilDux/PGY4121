import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../auth.service'; // Importa el nuevo servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('loginCardWrapper', { read: ElementRef, static: true }) loginCardWrapper!: ElementRef;

  login: any = {
    Usuario: '',
    Password: '',
  };

  storageReady: boolean = false;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private animationCtrl: AnimationController,
    private authService: AuthService // Inyecta el nuevo servicio
  ) {}

  ngOnInit() {}

  async ingresar() {
    const validationMessage = this.validateModel(this.login);
    if (validationMessage === 'success') {
      const user = this.login.Usuario;
      const password = this.login.Password;
      const foundUser = this.authService.loginUser(user, password); // Utiliza el método de autenticación

      if (foundUser) {
        const userData = { Usuario: user };
        this.presentToast('Bienvenido');
        await this.playLoginAnimation();
        this.router.navigate(['/home']);
      } else {
        this.presentToast('Credenciales inválidas');
      }

    } else {
      this.presentToast('Error: ' + validationMessage);
    }
  }

  validateModel(model: any): string {
    if (model.Usuario.length < 3 || model.Usuario.length > 8) {
      return 'El usuario debe tener al menos 3 caracteres y un máximo de 8';
    }
    if (model.Password.length !== 4) {
      return 'La contraseña debe tener exactamente 4 caracteres';
    }
    return 'success';
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }

  async playLoginAnimation() {
    const cardElement = this.loginCardWrapper.nativeElement.querySelector('.login-card');

    const animation = this.animationCtrl
      .create()
      .addElement(cardElement)
      .duration(800)
      .iterations(1)
      .fromTo('transform', 'translateY(0)', 'translateY(-100px)')
      .fromTo('opacity', '1', '0');

    await animation.play();
  }

  async registro() {
    this.router.navigate(['/registro']);
  }

}
