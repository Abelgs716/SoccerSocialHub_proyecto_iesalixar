import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { HomeService } from 'src/app/services/home.service';
import Swal from 'sweetalert2';
import { AuthServiceService } from 'src/app/services/auth-service.service';
 
@Component({
  selector: 'app-detalles-evento',
  templateUrl: './detalles-evento.page.html',
  styleUrls: ['./detalles-evento.page.scss'],
})
export class DetallesEventoPage implements OnInit {
  evento: Evento = {
    id: 0,
    idCreador: 0,
    nombreEvento: '',
    fechaInicioEvento: new Date(),
    descripcion: '',
    descripcionLarga: '',
    estado: 0,
    ubicacion: '',
    imagen: '',
    maxPersonas: 0,
    organizadores: [],
    trabajadoresInscritos: []
  };
 
  organizadores: Usuario[] = [];
  usuarios: Usuario[] = [];
  email: string | null = null;
  id!: number;
  isCreator: boolean = false;
  isInscrito: boolean = false;
 
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.id = Number(route.snapshot.paramMap.get('id')!);
  }
 
  ngOnInit() {
    this.getEventoById(this.id);
    this.getTrabajador();
    this.getTrabajadoresInscritos(this.id);
    this.getOrganizadores(this.id);
    this.verificarInscripcion();
  }
 
  getTrabajador() {
    this.email = this.authService.getUserId();
  }
 
  getOrganizadores(idEvento: number) {
    this.homeService.getOrganizadoresById(idEvento).subscribe(
      organizadores => {
        this.organizadores = organizadores;
      },
      error => {
        console.error('Error al obtener los organizadores', error);
      }
    );
  }
 
  editarEvento() {
    console.log("Se ha pulsado en editar");
  }
 
  eliminarEvento() {
    if (!this.email) {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Debes estar logueado para realizar esta acción.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        heightAuto: false
      });
      return;
    }
 
    this.homeService.getTrabajadorEmail(this.email).subscribe(
      (usuario: Usuario) => {
        if (usuario.id !== this.evento.idCreador) {
          Swal.fire({
            title: 'Acceso denegado',
            text: 'Solo el creador del evento puede eliminarlo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            heightAuto: false
          });
          return;
        }
 
        Swal.fire({
          title: '¿Estás seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminarlo!',
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.homeService.eliminarEventoById(this.id).subscribe(
              response => {
                Swal.fire({
                  title: 'Eliminado!',
                  text: 'El evento ha sido eliminado.',
                  icon: 'success',
                  heightAuto: false
                }).then(() => {
                  this.router.navigate(['/home']);
                  this.recargarPagina();
                });
              },
              error => {
                console.error('Error al eliminar el evento', error);
                Swal.fire({
                  title: 'Error!',
                  text: 'Hubo un problema al intentar eliminar el evento.',
                  icon: 'error',
                  heightAuto: false
                });
              }
            );
          }
        });
      },
      error => {
        console.error('Error al obtener el trabajador', error);
        Swal.fire({
          title: 'Error!',
          text: 'Hubo un problema al verificar los permisos.',
          icon: 'error',
          heightAuto: false
        });
      }
    );
  }
 
  getEventoById(id: number) {
    this.homeService.getEventoById(id).subscribe(
      data => {
        this.evento = data;
        this.checkIsCreator();
      },
      error => {
        console.log(error);
      }
    );
  }
 
  checkIsCreator() {
    if (!this.email) {
      this.isCreator = false;
      return;
    }
 
    this.homeService.getTrabajadorEmail(this.email).subscribe(
      (usuario: Usuario) => {
        this.isCreator = usuario.id === this.evento.idCreador;
      },
      error => {
        console.error('Error al obtener el usuario', error);
        this.isCreator = false;
      }
    );
  }
 
  anadirEvento() {
    if (this.isEventoLleno()) {
      Swal.fire({
        title: 'Plazas llenas',
        text: 'No se pueden añadir más personas al evento, las plazas están completas.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        heightAuto: false
      });
      return;
    }
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true,
      heightAuto: false
    });
 
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
        if (this.email) {
          this.homeService.unirseEvento(this.id, this.email).subscribe(
            response => {
              swalWithBootstrapButtons.fire(
                "¡Aceptado!",
                "El usuario ha sido añadido correctamente.",
                "success"
              );
              this.getEventoById(this.id);
              this.getTrabajadoresInscritos(this.id);
              this.verificarInscripcion();
            },
            error => {
              console.error('Error al unirse al evento', error);
            }
          );
        } else {
          console.error('Email del usuario no encontrado');
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Para apuntarte a un evento tienes que estar logeado.",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ir al login",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
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
  }
 
  quitarEvento() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true,
      heightAuto: false
    });
 
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
        if (this.email) {
          this.homeService.desapuntarseEvento(this.id, this.email).subscribe(
            response => {
              swalWithBootstrapButtons.fire(
                "¡Aceptado!",
                "El usuario ha sido desapuntado correctamente.",
                "success"
              );
              this.getEventoById(this.id);
              this.getTrabajadoresInscritos(this.id);
              this.verificarInscripcion();
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
  }
 
  getTrabajadoresInscritos(idEvento: number) {
    this.homeService.getListaTrabajadoresInscritosById(idEvento).subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
        this.evento.trabajadoresInscritos = data;
      },
      error => {
        console.log(error);
      }
    );
  }
 
  verificarInscripcion() {
    if (this.email) {
      this.homeService.isTrabajadorInscrito(this.id, this.email).subscribe(isInscrito => {
        this.isInscrito = isInscrito;
      });
    }
  }
 
  isEventoLleno(): boolean {
    // Verificamos que trabajadoresInscritos no sea undefined
    if (!this.evento.trabajadoresInscritos) {
      return false;
    }
    console.log(this.evento.trabajadoresInscritos.length);
   
    // Si la lista de trabajadoresInscritos está vacía, consideramos que el evento no está lleno
    if (this.evento.trabajadoresInscritos.length === 0) {
      return false;
    }
   
    // Verificamos que maxPersonas no sea undefined o null
    if (this.evento.maxPersonas === undefined || this.evento.maxPersonas === null) {
      return false;
    }
   
    // Comparamos el número de trabajadores inscritos con el máximo permitido
    return this.evento.trabajadoresInscritos.length == this.evento.maxPersonas;
  }
 
  recargarPagina() {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
}
 