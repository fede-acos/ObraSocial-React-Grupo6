//TODO
//remover los console.log cuando este todo OK.
//mover los types a otra carpeta
//quizas agregar optimistic updates

export interface SpecialistDto {
  id : number;
  nombre: string;
  especialidad: string;
  horarioEntrada: string;
  horarioSalida: string;
  ubicacion: {
    provincia: string;
    ciudad: string;
  };
}
