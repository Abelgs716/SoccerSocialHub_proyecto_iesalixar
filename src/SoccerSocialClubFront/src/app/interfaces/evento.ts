import { Usuario } from "./usuario";

export interface Evento {
  id: number;
  idCreador: number;
  nombreEvento: string;
  fechaInicioEvento: Date;
  descripcion: string;
  descripcionLarga: string;
  estado:number;
  ubicacion: string;
  imagen: string;
  maxPersonas: number;
  organizadores: Usuario[];
  trabajadoresInscritos: Usuario[];
}
