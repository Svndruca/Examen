// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  cambiarContrasenaEnLista(usuario: string, nuevaContrasena: string): Observable<any> {
    const url = `${this.apiUrl}/${usuario}`;
    const body = { password: nuevaContrasena };

    return this.http.put(url, body);
  }
}
