import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage {
  usuario: string = '';
  contrasenaNueva: string = '';
  confirmarContrasena: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.usuario = params['usuario'] || '';
    });
  }

  async cambiarContrasena() {
    try {
      // Obtener la lista de usuarios
      const response: any[] | undefined = await this.userService.getUsuarios().toPromise();

      // Verificar si la respuesta es undefined
      if (response === undefined) {
        this.mostrarAlerta('Error al obtener la lista de usuarios.');
        return;
      }

      // Verificar si el usuario existe en la lista
      const usuarioEncontrado = response.find((usuario) => usuario.username === this.usuario);

      if (!usuarioEncontrado) {
        this.mostrarAlerta('Usuario no encontrado. Credenciales incorrectas.');
        return;
      }

      // Verificar si las contraseñas coinciden
      if (this.contrasenaNueva !== this.confirmarContrasena) {
        this.mostrarAlerta('Las contraseñas no coinciden. Favor intentar nuevamente.');
      } else {
        // Actualizar la contraseña en el servicio (actualiza la lista de usuarios)
        usuarioEncontrado.password = this.contrasenaNueva;

        // Actualizar la contraseña en la API REST
        await this.userService.actualizarUsuario(usuarioEncontrado);

        // Informar al usuario y redirigir
        this.mostrarAlerta('Contraseña cambiada exitosamente.');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      this.mostrarAlerta('Error al intentar cambiar la contraseña.');
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  regresar() {
    this.router.navigate(['/login']);
  }
}
