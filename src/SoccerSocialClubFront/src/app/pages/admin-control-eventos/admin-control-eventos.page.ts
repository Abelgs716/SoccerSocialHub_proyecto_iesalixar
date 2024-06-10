import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-control-eventos',
  templateUrl: './admin-control-eventos.page.html',
  styleUrls: ['./admin-control-eventos.page.scss'],
})
export class AdminControlEventosPage implements OnInit {
  eventos: Evento[] = [];
  trabajadoresMap: { [key: number]: Usuario | undefined } = {};
  p: number = 1; // Variable para la paginación actual
  totalPages: number = 0; // Total de páginas

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.getEventos();
  }

  getEventos(): void {
    this.adminService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data.filter(evento => evento.estado === 0);
        this.totalPages = Math.ceil(this.eventos.length / 10);

        if (this.eventos.length > 0 && this.eventos.length < (this.p - 1) * 10 + 1) {
          this.p = Math.max(1, this.p - 1);
        } else if (this.eventos.length === 0 && this.p > 1) {
          this.p = this.p - 1;
        }

        this.eventos.forEach(evento => {
          if (!this.trabajadoresMap[evento.idCreador]) {
            this.trabajadoresMap[evento.idCreador] = undefined;
          }
          this.getTrabajadorId(evento.idCreador).subscribe(trabajador => {
            this.trabajadoresMap[evento.idCreador] = trabajador;
          });
        });
      },
      error: (error) => {
        console.error('Error al cargar partidos', error);
      }
    });
  }

  getTrabajadorId(idCreador: number) {
    return this.adminService.getUsuarioId(idCreador);
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

    if (this.p > 3) {
      startPage = this.p - 1;
      endPage = Math.min(this.totalPages, this.p + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  updateEstadoEvento(id: number | undefined): void {
    if (id !== undefined) {
      this.adminService.updateEstadoEvento(id).subscribe(
        () => {
          this.getEventos(); // Recargar eventos tras la actualización
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  rechazarEvento(id: number | undefined, motivo: string): void {
    if (id !== undefined) {
      this.adminService.rechazarEvento(id, motivo).subscribe(
        () => {
          this.getEventos(); // Recargar eventos tras eliminar
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  confirmarAceptacion(id: number | undefined) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true,
      heightAuto: false
    });

    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro de que quieres aceptar este partido?",
      text: "Una vez aceptado, no podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Sí, aceptar!",
      cancelButtonText: "¡No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "¡Aceptado!",
          "El partido ha sido aceptado correctamente.",
          "success"
        );
        this.updateEstadoEvento(id);
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

  confirmarRechazo(id: number | undefined) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true,
      heightAuto: false
    });

    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro de que quieres rechazar esta solicitud?",
      html: '<input id="swal-input1" class="swal2-input" placeholder="*Motivo de rechazo*" required>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Sí, rechazar!",
      cancelButtonText: "¡No, cancelar!",
      reverseButtons: true,
      focusConfirm: false,
      preConfirm: () => {
        const motivo = (<HTMLInputElement>document.getElementById("swal-input1")).value.trim();
        if (motivo.length > 250) {
          Swal.showValidationMessage("El motivo de rechazo debe tener un máximo de 250 caracteres.");
          return false;
        }
        if (motivo.length < 10) {
          Swal.showValidationMessage("El motivo de rechazo debe tener un minimo de 10 caracteres.");
          return false;
        }
        if (!/^[a-zA-Z0-9 \.,;!?()-]*$/.test(motivo)) {
          Swal.showValidationMessage("El motivo de rechazo contiene caracteres inválidos.");
          return false;
        }
        return [motivo];
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const motivoRechazo = result.value[0];
        if (motivoRechazo) {
          swalWithBootstrapButtons.fire(
            "¡Rechazado!",
            "El partido ha sido rechazado correctamente.",
            "success"
          );
          this.rechazarEvento(id, motivoRechazo);
        } else {
          swalWithBootstrapButtons.fire(
            "Campo obligatorio",
            "Debes ingresar un motivo de rechazo.",
            "error"
          );
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
}
