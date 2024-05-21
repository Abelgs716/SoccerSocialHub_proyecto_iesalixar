import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceLoginService } from './service-login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  token: any;
  email!: string;
  password!: string;
  resultados: any;
  cabezeras = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private llamada: ServiceLoginService, private router: Router) { }

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
        this.router.navigate(["/admin"]);  // Navega a la página de administración
      },
      error => {
        console.error('Error during login:', error);
        // Aquí puedes manejar errores de login, por ejemplo, mostrando un mensaje de error.
      });
  }
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






 
 