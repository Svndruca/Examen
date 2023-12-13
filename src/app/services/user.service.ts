import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Nuevo método para actualizar un usuario
  actualizarUsuario(usuario: any): Observable<any> {
    const url = `${this.apiUrl}/${usuario.id}`;
    return this.http.put(url, usuario);
  }
}
