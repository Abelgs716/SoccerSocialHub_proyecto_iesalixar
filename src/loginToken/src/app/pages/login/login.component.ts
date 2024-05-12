import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceLoginService } from './service-login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  token: any;
  constructor(private llamada: ServiceLoginService) { }
  email!: string;
  password!: string;
  resultados: any;
  cabezeras = new HttpHeaders({ 'Content-Type': 'application/json' });

  onSubmit() {
    const dataform = {
      email: this.email,
      password: this.password
    };

    this.llamada
      .getByUrl("http://localhost:8080/api/v1/auth/signin", dataform)

      .subscribe(resp => {
        this.token = resp.token;
        localStorage.setItem("token", this.token);
      }
      )
  }

  /*listarCaramelos() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    });
    this.listado
      .getListado("http://localhost:8080/api/v1/caramelos", headers)
      .subscribe(resp => {
        this.resultados = resp.content;
      })
  }*/


}



 
 