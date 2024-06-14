import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Evento } from '../interfaces/evento';
import { Usuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return headers;
  }

  desapuntarseEvento(idEvento: number, email: string): Observable<any> {
    const token = localStorage.getItem('token');
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      const body = {
        idEvento: idEvento,
        email: email
      };
  
      return this.http.post(`${environment.apiURL}/evento/desapuntarse`, body, { headers });
    } else {
      console.error('Token no encontrado');
      return new Observable(); 
    }
  }
  

  unirseEvento(idEvento: number, email: string): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const body = {
        idEvento: idEvento,
        email: email
      };

      return this.http.post(`${environment.apiURL}/evento/unirse`, body, { headers });
    } else {
      console.error('Token no encontrado');
      return new Observable(); 
    }
  }

  getListaUsuariosInscritosById(id: number): Observable<Usuario[]> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<Usuario[]>(`${environment.apiURL}/evento/usuarios_inscritos/${id}`, { headers });
    } else {
      console.error('Token no encontrado');
      return new Observable<Usuario[]>(); 
    }
  }

  getEventos(): Observable<Evento[]> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<Evento[]>(`${environment.apiURL}/evento`, { headers });
    } else {
      return this.http.get<Evento[]>(`${environment.apiURL}/evento`, {  });
    }
  }

  getEventoById(id:number): Observable<Evento>{
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<Evento>(`${environment.apiURL}/evento/`+ id, { headers });
    } else {
      return this.http.get<Evento>(`${environment.apiURL}/evento/`+ id, {  });
    }
  }

  eliminarEventoById(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.delete(`${environment.apiURL}/evento/` + id, { headers });
    } else {
      console.error('Token no encontrado');
      return new Observable();
    }
  }

  createEvento(evento: Evento): Observable<Evento> {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No se encontró el token de autenticación.');
        return throwError('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(evento);
    return this.http.post<Evento>(`${environment.apiURL}/evento`, evento, { headers }).pipe(
        catchError(this.handleError)
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError(error);
  }

  getUsuarioEmail(email: string): Observable<Usuario>{
    const headers = this.getHeaders();
    return this.http.get<Usuario>(`${environment.apiURL}/usuario/email/${email}`, { headers });
  }

  isUsuarioInscrito(idEvento: number, email: string): Observable<boolean> {
    return this.getListaUsuariosInscritosById(idEvento).pipe(
        map((usuarios: Usuario[]) => usuarios.some(usuario => usuario.email === email)),
        catchError(err => {
            console.error('Error al verificar la inscripción', err);
            return of(false);
        })
    );
}

getOrganizadoresById(idEvento: number): Observable<Usuario[]> {
  
  return this.http.get<Usuario[]>(`${environment.apiURL}/evento/${idEvento}/organizadores`, {  });
}

 
}