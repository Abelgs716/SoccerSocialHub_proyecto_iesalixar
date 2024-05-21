import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface User {
  name: string;
  email: string;
  role: string;
  selected: boolean;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  standalone: true,
  imports: [ FormsModule,CommonModule],
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  users: User[] = [
    { name: 'Fernando Pérez', email: 'fer@gmail.com', role: 'Administrador', selected: false },
    { name: 'Diego Hernández', email: 'diego@gmail.com', role: 'Usuario', selected: false },
    { name: 'Salvador Mejías', email: 'salvador@gmail.com', role: 'Usuario', selected: false },
    { name: 'Pablo Sánchez', email: 'pablo@gmail.com', role: 'Usuario', selected: false },
    { name: 'Nicolás Castro', email: 'nico@gmail.com', role: 'Administrador', selected: false },
    { name: 'Andrés Rodríguez', email: 'andres@gmail.com', role: 'Administrador', selected: false },
    { name: 'Jorge Calzado', email: 'jorge@gmail.com', role: 'Usuario', selected: false }
  ];
}
