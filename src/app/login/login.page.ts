import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formData = {
    username: '',
    password: '',
    showPassword: false,
  };
  isLoading: boolean = false;
  isMouseOver: boolean = false;

  // Define a list of users with their credentials
  userList = [
    { username: 'sa.gonzalezg', password: '1234' },
    { username: 'na.quintana', password: '5678' },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient
  ) {}

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Credenciales incorrectas',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  redirectToResetPasswordPage() {
    this.router.navigate(['/cambio-contrasena']);
  }

  async ingresar(): Promise<void> {
    const body = {
      username: this.formData.username,
      password: this.formData.password,
    };

    // Check if the entered credentials match any user in the predefined list
    const usuarioEncontrado = this.userList.find(
      (usuario) => usuario.username === body.username && usuario.password === body.password
    );

    if (usuarioEncontrado) {
      // Generate a simple token (in a real-world scenario, use JWT)
      const token = 'asdf1234';

      // Save the token and username in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', body.username);

      // Navigate to the home page
      this.router.navigate(['/home']);
    } else {
      console.log('Credenciales incorrectas.');
      this.mostrarAlerta('Credenciales incorrectas.');
    }

    this.isLoading = false;
  }

  togglePassword(): void {
    this.formData.showPassword = !this.formData.showPassword;
  }
}

