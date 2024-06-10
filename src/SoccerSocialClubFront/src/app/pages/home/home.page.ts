import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento';
import { HomeService } from 'src/app/services/home.service';
import { AuthServiceService } from 'src/app/services/auth-service.service'; // Importa tu servicio de autenticación
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/usuario';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  eventos: Evento[] = [];
  email: string | null = null; // Cambia el tipo de la variable a string | null
  p: number = 1; // Variable para la paginación actual
  totalPages: number = 0; // Total de páginas
 
  constructor(
    private homeService: HomeService,
    private authService: AuthServiceService // Inyecta tu servicio de autenticación
  ) { }
 
  ngOnInit() {
    this.getTrabajador();
    this.getEventos();
  }
 
  getEventos(): void {
    this.homeService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data.filter(evento => evento.estado === 1);
        this.totalPages = Math.ceil(this.eventos.length / 5);
        this.ajustarListasTrabajadoresInscritos();
        if (this.eventos.length > 0 && this.eventos.length < (this.p - 1) * 5 + 1) {
          this.p = Math.max(1, this.p - 1);
        } else if (this.eventos.length === 0 && this.p > 1) {
          this.p = this.p - 1;
        }
      },
      error: (error) => {
        console.error('Error al cargar eventos', error); // Uso de console.error aquí
      }
    });
  }
 
  ajustarListasTrabajadoresInscritos(): void {
    for (let evento of this.eventos) {
      this.homeService.getListaTrabajadoresInscritosById(evento.id).subscribe(
        (data: Usuario[]) => {
          evento.trabajadoresInscritos = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
 
  getTrabajador() {
    const email = this.authService.getUserId();
    this.email = email;
  }
 
  anadirEvento(idEvento: number | undefined) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true,
      heightAuto: false
    });
 
    if (idEvento !== undefined) {
      const evento = this.eventos.find(e => e.id === idEvento);
      if (evento && this.isEventoLleno(evento)) {
        swalWithBootstrapButtons.fire({
          title: 'Plazas llenas',
          text: 'No se pueden añadir más personas al evento, las plazas están completas.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        return;
      }
 
      swalWithBootstrapButtons.fire({
        title: "¿Estás seguro de que quieres añadirte a este evento?",
        text: "Una vez aceptado, no podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, aceptar!",
        cancelButtonText: "¡No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const email = this.authService.getUserId(); // Obtener el email del usuario desde el servicio de autenticación
          if (email) {
            this.homeService.unirseEvento(idEvento, email).subscribe(
              response => {
                swalWithBootstrapButtons.fire(
                  "¡Aceptado!",
                  "El usuario ha sido añadido correctamente.",
                  "success"
                );
                this.getEventos();
              },
              error => {
                console.error('Error al unirse al evento', error);
              }
            );
          } else {
            console.error('Email del usuario no encontrado');
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              text: "Para apuntarte a un partido tienes que iniciar sesión.",
              icon: "error",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ir al login",
              cancelButtonText: "Cancelar"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/login";
              }
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "La operación ha sido cancelada.",
            "error"
          );
        }
      }).catch(error => {
        console.error(error);
      });
    } else {
      console.error('ID del evento no definido');
    }
  }
 
  quitarEvento(idEvento: number | undefined) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true,
      heightAuto: false
    });
 
    if (idEvento !== undefined) {
      swalWithBootstrapButtons.fire({
        title: "¿Estás seguro de que quieres desapuntarte de este evento?",
        text: "Una vez aceptado, no podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, aceptar!",
        cancelButtonText: "¡No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const email = this.authService.getUserId(); // Obtener el email del usuario desde el servicio de autenticación
          if (email) {
            this.homeService.desapuntarseEvento(idEvento, email).subscribe(
              response => {
                swalWithBootstrapButtons.fire(
                  "¡Aceptado!",
                  "El usuario ha sido desapuntado correctamente.",
                  "success"
                );
                this.getEventos();
              },
              error => {
                console.error('Error al desapuntarse del evento', error);
              }
            );
          } else {
            console.error('Email del usuario no encontrado');
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "La operación ha sido cancelada.",
            "error"
          );
        }
      }).catch(error => {
        console.error(error);
      });
    } else {
      console.error('ID del evento no definido');
    }
  }
 
  changePage(page: number): void {
    this.p = page;
  }
 
  goToFirstPage(): void {
    this.changePage(1);
  }
 
  goToLastPage(): void {
    this.changePage(this.totalPages);
  }
 
  get pagesToShow(): number[] {
    const pages: number[] = [];
    let startPage: number = Math.max(1, this.p - 1);
    let endPage: number = Math.min(this.totalPages, startPage + 2);
 
    // Ajuste para tener en cuenta el número de páginas y la posición actual
    if (this.p > 3) {
      startPage = this.p - 1;
      endPage = Math.min(this.totalPages, this.p + 1);
    }
 
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
 
    return pages;
  }
 
  checkTrabajadorInscrito(evento: Evento): boolean {
    return !!this.email && !!evento.trabajadoresInscritos && evento.trabajadoresInscritos.some(trabajador => trabajador.email === this.email);
  }
 
  isEventoLleno(evento: Evento): boolean {
    // Verificamos que trabajadoresInscritos no sea undefined
    if (!evento.trabajadoresInscritos) {
      return false;
    }
    console.log(evento.trabajadoresInscritos.length);
   
    // Si la lista de trabajadoresInscritos está vacía, consideramos que el evento no está lleno
    if (evento.trabajadoresInscritos.length === 0) {
      return false;
    }
   
    // Verificamos que maxPersonas no sea undefined o null
    if (evento.maxPersonas === undefined || evento.maxPersonas === null) {
      return false;
    }
   
    // Comparamos el número de trabajadores inscritos con el máximo permitido
    return evento.trabajadoresInscritos.length == evento.maxPersonas;
  }
 
  recargarPagina() {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
}
 