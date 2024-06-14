import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Evento } from '../../interfaces/evento';
import { Usuario } from '../../interfaces/usuario';
import { AdminService } from 'src/app/services/admin.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild('search', { static: false }) public searchElementRef!: ElementRef;

  usuario?: Usuario;
  todosOrganizadores!: Usuario[];
  eventForm!: FormGroup;
  usuarios: Usuario[] = [];
  imagenCodificada: string = ''; 
  email: string | null = null;
  minDate: string;
  maxDate: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private homeService: HomeService,
    private toastController: ToastController,
    private adminService: AdminService,
    private authService: AuthServiceService,
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.maxDate = '2027-12-31'; // Fecha máxima
  }

  ngOnInit() {
    this.eventForm = this.fb.group({
      nombreEvento: ['', [Validators.required, this.noWhitespaceValidator]],
      descripcion: ['', [Validators.required, this.noWhitespaceValidator]],
      organizadores: [[], [Validators.required]], // Inicializar como array vacío
      fechaInicioEvento: [this.minDate, [Validators.required]], // Set default date to current date
      descripcionLarga: ['', [Validators.required, this.noWhitespaceValidator]],
      ubicacion: ['', [Validators.required, this.noWhitespaceValidator]],
      maxPersonas: 10,
      imagenCodificada: ['', [Validators.required]]  // Agregar imagenCodificada al formulario
    });

    this.adminService.getUsuarios().subscribe(
      data => {
        this.todosOrganizadores = data;
      }
    );

    this.getTrabajador();

    // Escuchar cambios en el campo de fecha
    this.eventForm.get('fechaInicioEvento')?.valueChanges.subscribe(date => {
      this.adjustMaxDate(new Date(date));
    });
  }

  adjustMaxDate(selectedDate: Date) {
    const year = selectedDate.getFullYear();
    if (year >= 2025) {
      this.maxDate = `${year + 3}-12-31`;
    }
  }

  getTrabajador(){
    const email = this.authService.getUserId();
    this.email = email;  
    if (this.email) {
      this.getTrabajadorEmail(this.email);
    } else {
      console.error('No se pudo obtener el email del usuario.');
    }
  }

  async toast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }

  crearEvento() {
    if (this.eventForm.invalid) {
        this.toast("Por favor, complete todos los campos correctamente.");
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        this.toast("No se encontró el token de autenticación. Por favor, inicia sesión.");
        return;
    }

    const evento: Evento = {
        id: 0,
        idCreador: this.usuario?.id ?? 0,
        fechaInicioEvento: new Date(this.eventForm.value.fechaInicioEvento),
        organizadores: this.eventForm.value.organizadores || [],
        nombreEvento: this.eventForm.value.nombreEvento.trim(),
        descripcion: this.eventForm.value.descripcion.trim(),
        descripcionLarga: this.eventForm.value.descripcionLarga.trim(),
        trabajadoresInscritos: [],
        imagen: this.eventForm.value.imagenCodificada,
        maxPersonas: this.eventForm.value.maxPersonas,
        ubicacion: this.eventForm.value.ubicacion.trim(),
        estado: 0,
    };

    console.log(evento);

    if (!this.validarEvento(evento)) {
        this.toast("Por favor, complete todos los campos correctamente.");
        return;
    }

    this.homeService.createEvento(evento).subscribe(
        response => {
            this.toast("Partido creado con éxito");
            this.router.navigate(['/home']);
        },
        error => {
            console.error('Error al crear el Partido:', error);  // Más detalles del error
            if (error.status === 403) {
                this.toast("No tienes permiso para realizar esta acción. Verifica tus credenciales.");
            } else if (error.status === 400) {
                this.toast("Error de solicitud: Verifique los datos enviados.");
            } else {
              console.log(evento);
                this.toast("Error al crear el Partido");
            }
        }
    );
  }

  validarEvento(evento: Evento): boolean {
    if (!evento.nombreEvento || !evento.descripcion || !evento.fechaInicioEvento || !evento.descripcionLarga || !evento.ubicacion || evento.maxPersonas <= 0 || !evento.imagen) {
      return false;
    }
    return true;
  }

  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenCodificada = reader.result as string;
        this.eventForm.patchValue({ imagenCodificada: this.imagenCodificada }); // Actualizar el formulario con la imagen codificada
      };
      reader.readAsDataURL(file);
    }
  }
  
  getTrabajadorEmail(email: string): void {
    this.homeService.getTrabajadorEmail(email).subscribe({
      next: (trabajador) => {
        this.usuario = trabajador;
        console.log('Usuario cargado:', trabajador);
        // Aquí podrías hacer algo con la información del usuario, como almacenarlo o actualizar una vista.
      },
      error: (error) => {
        console.error('Error al cargar información del usuario', error);
      }
    });
  }
}
