import {
  Avatar,
  Button,
  Card,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import { TurnoDto } from "../types/TurnoDto";
import { TurnosWithSpecialist } from "../types/TurnoWithSpecialist";

interface TurnoCardProps {
  turno: TurnosWithSpecialist;
  loading: boolean;
  onEdit: (turno: TurnoDto) => void;
  onDelete: (turnoId: number) => void;
}

const TurnoCard: React.FC<TurnoCardProps> = ({
  turno,
  loading,
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

  return (
    <>
      {loading ? (
        <div>
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <Card className="w-full  flex flex-row items-center px-2 gap-2 min-h-20 xl:min-h-32 justify-around xl:text-2xl  ">
            <Avatar showFallback className="hidden md:block lg:w-14 lg:h-14" />
            <span className="w-20 md:w-28 xl:w-40 2xl:w-48">
              <p>{turno.nombreEspecialista}</p>
            </span>

            <span className="">{formatDate(turno.fecha)}</span>

            <span className="">{formatHour(turno.hora)} </span>
            <span className=""> {turno.motivoConsulta} </span>
            <span className=" ">30min</span>
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button size="sm" color="primary" className="text-xl">
                  ...
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className=" flex flex-col px-1 py-2 gap-2 ">
                  <Button
                    className="text-small  "
                    onClick={() => onEdit(turno)}
                  >
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
