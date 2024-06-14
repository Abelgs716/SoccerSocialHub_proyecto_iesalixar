import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AdminService } from 'src/app/services/admin.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
 
  usuarios: Usuario[] = [];
  p: number = 1; // Variable para la paginación actual
  totalPages: number = 0; // Total de páginas
  constructor(private adminService: AdminService, private authService: AuthServiceService, private router: Router) { }
 
  ngOnInit(): void {
    this.getUsuarios();
  }


  getUsuarios(): void {
    this.adminService.getUsuarios().subscribe({
      next: (data) => {
        // Filtrar eventos según su estado
        this.usuarios = data.filter(usuarios => usuarios.estado === 0);
        // Calcular el número total de páginas
        this.totalPages = Math.ceil(this.usuarios.length / 10);
 
        // Ajustar la paginación en caso de que no haya eventos en la página actual
        if (this.usuarios.length > 0 && this.usuarios.length < (this.p - 1) * 10 + 1) {
          // Si la página actual no tiene eventos, retrocede una página
          this.p = Math.max(1, this.p - 1);
        } else if (this.usuarios.length === 0 && this.p > 1) {
          // Si no hay eventos y estamos en una página mayor a la primera, vuelve a la página anterior
          this.p = this.p - 1;
        }
       
      },
      error: (error) => {
        // Manejar el error al cargar eventos
        console.error('Error al cargar usuarios', error);
      }
    });
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
 
  // METODO UPDATE ESTADO
  updateEstadoUsuario(id: number | undefined): void {
    if (id !== undefined) {
      this.adminService.updateEstadoUsuario(id).subscribe(
        () => {
          this.getUsuarios();
        },
        error => {
          console.error(error);
        }
      );
    }
  }
 
  eliminarUsuario(id: number | undefined, motivo: string): void {
    if (id !== undefined) {
      this.adminService.deleteUsuario(id, motivo).subscribe(
        () => {
          this.getUsuarios();
        },
        error => {
          console.error(error);
        }
      );
    }
  }
 
  // ALERTA CUANDO LE DA AL ICONO DE ACEPTAR
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
      title: "¿Estás seguro de que quieres aceptar esta solicitud?",
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
          "El usuario ha sido aceptado correctamente.",
          "success"
        );
        this.updateEstadoUsuario(id);
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

  
 
  // ALERTA CUANDO LE DA AL ICONO RECHAZAR
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
        if (!/^[a-zA-Z0-9 \.,;!?()-]*$/.test(motivo)) { //ADMITE A-Za-z y esos caracteres especiales
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
            "El usuario ha sido rechazado correctamente.",
            "success"
          );
          this.eliminarUsuario(id, motivoRechazo);
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