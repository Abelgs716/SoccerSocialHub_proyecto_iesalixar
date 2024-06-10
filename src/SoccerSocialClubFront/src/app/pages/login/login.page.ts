import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/interfaces/login-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm! : FormGroup;
  token! : string;

  constructor(private fb : FormBuilder, private router : Router, private loginService : LoginService, private toastController : ToastController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get nombreUsuario() {
    return this.loginForm.get('nombreUsuario');
  }
  get password() {
    return this.loginForm.get('password');
  }
  

  async toast(mensaje : string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }

  login() {

    let usu : LoginInterface= {
      nombreUsuario : this.loginForm.value.nombreUsuario,
      password :  this.loginForm.value.password
    }

    this.loginService.login(usu).subscribe(
      (resp) => {
        this.token = resp.token;
        localStorage.setItem("token", this.token);
        this.toast("Autenticacion Permitida")
        this.router.navigate(["/home"])
        window.location.reload();
      },
      error => {
        this.toast("Autenticacion Fallida")
      }
      
    )
  }

}
