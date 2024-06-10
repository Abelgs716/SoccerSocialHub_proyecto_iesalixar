import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
   
  constructor(private router: Router, private http: HttpClient) { }
 
  getToken(): string | null {
    return localStorage.getItem('token');
  }
 
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
 
  isAdministrator(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeJWT(token);
      return decodedToken && decodedToken.rol === 'ADMIN';
    }
    return false;
  }
 
  decodeJWT(token: string) {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload;
  }
  getUserId(): string | null {
    return this.getSub();
  }
  
  getSub(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeJWT(token);
      return decodedToken.sub;
    }
    return null;
  }
 
  getRol(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeJWT(token);
      return decodedToken.rol;
    }
    return null;
  }
 
  redirectToLoginIfNotLoggedIn(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
 
  redirectToUnauthorizedIfNotAdmin(): void {
    if (!this.isAdministrator()) {
      this.router.navigate(['/unauthorized']);
    }
  }
 
  getAuthorizationHeader(): HttpHeaders | null {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return null;
  }
 
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}