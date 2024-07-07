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
import { useNavigate } from "react-router-dom";
import { useEntity } from "../services/useApi";
import { useState } from "react";
import { RecetaDto } from "../types/RecetaDto";

interface TurnoCardProps {
  turno: TurnoDtoResponse & SpecialistDto;
  loading: boolean;
  onEdit: (
    turno: TurnoDtoResponse,
    specialist: SpecialistDto | undefined
  ) => void;
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

  const navigate = useNavigate();
  const [turnoId, setTurnoId] = useState<string | null>(null);


  const { entity } = useEntity<RecetaDto>(
    "recetas",
    "http://localhost:8080/recetas",
    turnoId ? turnoId: null
  );

  const handleTurnoId = (id: string) => {
    setTurnoId(id);

    if (entity.data){
    const recetaDownload: RecetaDto = {
      turnoId: turno.turnoId,
      receta: entity.data.receta,
      fechaCreacion: entity.data.fechaCreacion,
      fechaValidez: entity.data.fechaValidez
      }

      navigate("/receta", { state: { recetaDownload: recetaDownload } });
    }
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
              <p>{turno.especialidad}</p>
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
                    onClick={() => onEdit(turno, turno)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="text-small"
                    onClick={() => onDelete(turno.turnoId)}
                  >
                    Cancelar
                  </Button>
                  <Button className="text-small"
                  onClick={() => handleTurnoId(turno.turnoId.toString())}
                  > Descargar Receta</Button>
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
