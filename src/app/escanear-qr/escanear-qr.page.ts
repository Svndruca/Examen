import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQRPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async tomarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, 
      });

     
      const urlImagen = imagen.webPath;

      // Puedes utilizar la URL de la imagen como necesites
      console.log('URL de la imagen:', urlImagen);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

}

