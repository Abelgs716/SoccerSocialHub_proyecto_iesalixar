import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  constructor(private http : HttpClient) { }
  getByUrl(url:string,dataform:any): Observable<any> {
    return this.http.post(url,dataform);

  }
}

