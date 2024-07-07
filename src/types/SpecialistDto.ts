export interface SpecialistDto {
  id: number;
  nombre: string;
  especialidad: string;
  horarioEntrada: string;
  horarioSalida: string;
  ubicacion: {
    provincia: string;
    ciudad: string;
  };
}
