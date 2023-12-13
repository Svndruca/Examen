// estudiante.page.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage implements OnInit {

  datosEstudiante = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rut: '',
    correo: '',
    fechaNacimiento: '',
  };

  mostrarFormulario = false;

  constructor() { }

  ngOnInit() {
    // Intentamos cargar los datos desde el localStorage
    const datosGuardados = localStorage.getItem('datosEstudiante');
    if (datosGuardados) {
      this.datosEstudiante = JSON.parse(datosGuardados);
    }
  }

  guardarDatos() {
    // Guardamos los datos en el localStorage
    localStorage.setItem('datosEstudiante', JSON.stringify(this.datosEstudiante));
    this.mostrarFormulario = false;
  }

  editarDatos() {
    // Habilitar el formulario para editar
    this.mostrarFormulario = true;
  }

}
