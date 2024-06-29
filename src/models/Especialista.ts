import { Ubicacion } from "./Ubicacion";

export interface Especialista {
  nombre: string;
  especialidad: string;
  horarioEntrada: string;
  horarioSalida: string;
  ubicacion: Ubicacion;

}