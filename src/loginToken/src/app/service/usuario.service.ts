import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../pages/interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  updateEstadoUsuario(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/estado`, {});
  }

  deleteUsuario(id: number, motivo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}?motivo=${motivo}`);
  }
}
