import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterInterface } from '../interfaces/register-interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  public register(usu : RegisterInterface) : Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/register`, usu);
  }
}
