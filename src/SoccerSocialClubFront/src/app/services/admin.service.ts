import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler';
import { AuthServiceService } from './auth-service.service';
import { Evento } from '../interfaces/evento';
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
   
  constructor(private http: HttpClient, private authService: AuthServiceService) { }
 
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return headers;
  }
 
  //PARA TRABAJADORES

  getUsuarios(): Observable<Usuario[]> {
    const headers = this.getHeaders();
    return this.http.get<Usuario[]>(`${environment.apiURL}/usuario`, { headers });
  }

  getUsuarioId(id: number): Observable<Usuario> {
    const headers = this.getHeaders();
    return this.http.get<Usuario>(`${environment.apiURL}/usuario/${id}`, { headers });
  }
 
  updateEstadoUsuario(id: number): Observable<Usuario> {
    const headers = this.getHeaders();
    return this.http.put<Usuario>(`${environment.apiURL}/usuario/updateEstado/${id}`, {}, { headers });
  }
 
  deleteUsuario(id: number, motivo: string): Observable<any> {
    const headers = this.getHeaders();
    const options = { headers: headers, params: { motivo: motivo } };
    return this.http.delete(`${environment.apiURL}/usuario/${id}`, options);
  }

  //PARA EVENTOS
  getEventos(): Observable<Evento[]> {
    const headers = this.getHeaders();
    return this.http.get<Evento[]>(`${environment.apiURL}/evento`, { headers });
  }

  updateEstadoEvento(id: number): Observable<Evento> {
    const headers = this.getHeaders();
    return this.http.put<Evento>(`${environment.apiURL}/evento/updateEstado/${id}`, {}, { headers });
  }
 
  rechazarEvento(id: number, motivo: string): Observable<any> {
    const headers = this.getHeaders();
    // Enviamos el motivo como parámetro de consulta en la URL
    const options = { headers: headers, params: { motivo: motivo } };
    return this.http.put(`${environment.apiURL}/evento/rechazarEvento/${id}`,{}, options);
  }


}