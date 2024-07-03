import { TurnoDto } from "./TurnosDto";

export interface TurnoDtoResponse extends TurnoDto {
  turnoId: number;
  pacienteId: number;
}
