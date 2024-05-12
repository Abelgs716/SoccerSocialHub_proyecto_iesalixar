import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ServiceCaramelosService {

  constructor(private http : HttpClient) { }
  getListado(url:string,headers:HttpHeaders): Observable<any> {
    return this.http.get(url,{headers});

  }
}

