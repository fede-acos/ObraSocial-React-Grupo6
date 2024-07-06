import {
  Avatar,
  Button,
  Card,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import { SpecialistDto } from "../types/SpecialistDto";
import { TurnoDtoResponse } from "../types/TurnoDtoResponse";
import { TurnoDto } from "../types/TurnosDto";

interface TurnoCardProps {
  turno: TurnoDtoResponse;
  specialistData: SpecialistDto[] | undefined;
  loadingSpecialist: boolean;
  onEdit: (turno: TurnoDto, specialist?: SpecialistDto) => void;
  onDelete: (turnoId: number) => void;
}

const TurnoCard: React.FC<TurnoCardProps> = ({
  turno,
  specialistData,
  loadingSpecialist,
  onEdit,
  onDelete,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-Es", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatHour = (time: string) => {
    return time.substring(0, 5);
  };

  const findSpecialistName = (id: number) => {
    const specialist = specialistData?.find(
      (specialist) => specialist.id === id
    );
    return specialist?.nombre || "";
  };

  const findSpecialist = (id: number) : SpecialistDto | undefined=> {
    return specialistData?.find(specialist => specialist.id === id);
  };

  return (
    <>
      {loadingSpecialist ? (
        <div>
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <Card className="w-full  flex flex-row items-center px-2 gap-4 min-h-20 xl:min-h-32 xl:justify-around xl:text-2xl  ">
            <Avatar showFallback size="lg" />
            <span>
              <p>{findSpecialistName(turno.especialistaId)}</p>
            </span>
            <span>{formatDate(turno.fecha)}</span>
            <span>{formatHour(turno.hora)} </span>
            <span> {turno.motivoConsulta} </span>
            <span>30min</span>
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button color="primary">...</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className=" flex flex-col px-1 py-2 gap-2 ">
                  <Button className="text-small " onClick={() => onEdit(turno, findSpecialist(turno.especialistaId))}>
                    Editar
                  </Button>
                  <Button
                    className="text-small"
                    onClick={() => onDelete(turno.turnoId)}
                  >
                    Cancelar
                  </Button>
                  <Button className="text-small"> Descargar Receta</Button>
                </div>
              </PopoverContent>
            </Popover>
          </Card>
        </>
      )}
    </>
  );
};

export default TurnoCard;
