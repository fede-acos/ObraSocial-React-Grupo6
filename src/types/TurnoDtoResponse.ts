import { TurnoDto } from "./TurnoDto";

export interface TurnoDtoResponse extends TurnoDto {
  turnoId: number;
  pacienteId: number;
}
