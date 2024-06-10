import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { RegisterInterface } from 'src/app/interfaces/register-interface';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  registerForm!: FormGroup;
 
  constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService, private toastController: ToastController) { }
 
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]],
      nombreUsuario: ['', [Validators.required,this.noSpacesValidator]],
      nombre: ['', [Validators.required, this.onlyLettersValidator]],
      apellidos: ['', [Validators.required, this.onlyLettersValidator]],
      password: ['', [Validators.required, Validators.minLength(6), this.noSpacesValidator]]
    });
 
    if (this.registerForm) {
      this.registerForm.get('nombreUsuario')!.valueChanges.subscribe(value => {
        if (typeof value === 'string') {
          this.registerForm.get('nombreUsuario')!.setValue(value.trim(), { emitEvent: false });
        }
      });
 
      this.registerForm.get('nombre')!.valueChanges.subscribe(value => {
        if (typeof value === 'string') {
          this.registerForm.get('nombre')!.setValue(value.trim(), { emitEvent: false });
        }
      });
 
      this.registerForm.get('apellidos')!.valueChanges.subscribe(value => {
        if (typeof value === 'string') {
          this.registerForm.get('apellidos')!.setValue(value.trim(), { emitEvent: false });
        }
      });
    }
  }
 
  onlyLettersValidator(control: AbstractControl): { [key: string]: any } | null {
    const onlyLettersRegex = /^[a-zA-Z]+$/;
    if (control.value && !onlyLettersRegex.test(control.value)) {
      return { 'onlyLetters': true };
    }
    return null;
  }
 
  onlyLettersAndNumbersValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value.trim();
    if (!value) {
      return null;
    }
 
    const firstChar = value.charAt(0);
    if (!(/[a-zA-Z]/).test(firstChar)) {
      return { 'firstCharNotLetter': true };
    }
 
    const restOfValue = value.slice(1);
    const onlyNumbersRegex = /^[0-9]*$/;
    if (!onlyNumbersRegex.test(restOfValue)) {
      return { 'onlyNumbersAfterFirstChar': true };
    }
 
    return null;
  }
 
  noSpacesValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && /\s/.test(control.value)) {
      return { 'noSpaces': true };
    }
    return null;
  }
 
  customEmailValidator(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }  
 
  get email() {
    return this.registerForm.get('email');
  }
 
  get nombreUsuario() {
    return this.registerForm.get('nombreUsuario');
  }
 
  get nombre() {
    return this.registerForm.get('nombre');
  }
 
  get apellidos() {
    return this.registerForm.get('apellidos');
  }
 
  get password() {
    return this.registerForm.get('password');
  }
 
  async toast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }
 
  register() {
    if (this.registerForm.invalid) {
      return;
    }
 
    const usu: RegisterInterface = {
      email: this.registerForm.value.email,
      nombreUsuario: this.registerForm.value.nombreUsuario,
      nombre: this.registerForm.value.nombre,
      apellidos: this.registerForm.value.apellidos,
      password: this.registerForm.value.password
    };
 
    this.registerService.register(usu).subscribe(
      (resp) => {
        this.toast("Registro Completado. Espere a que el administrador verifique su petición");
        this.router.navigate(["/home"]);
      },
      error => {
        this.toast("Registro Fallido");
      }
    );
  }
}