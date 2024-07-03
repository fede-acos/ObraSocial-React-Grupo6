import { Avatar, Card, Spinner } from "@nextui-org/react";
import { useEntities, useEntity } from "../services/useApi";
import { SpecialistDto } from "../types/SpecialistDto";
import { TurnoDtoResponse } from "../types/TurnoDtoResponse";

function TurnoCard({
  turno,
  specialistData,
  loadingSpecialist,
}: {
  turno: TurnoDtoResponse;
  specialistData: SpecialistDto[] | undefined;
  loadingSpecialist: boolean;
}) {
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

  return (
    <>
      {loadingSpecialist ? (
        <div>
          <Spinner size="lg" />
        </div>
      ) : (
        <Card className="w-full  flex flex-row items-center px-2 gap-4 min-h-20 xl:min-h-32 xl:justify-around xl:text-2xl  ">
          <Avatar showFallback size="lg" />
          <span>
            <p>{findSpecialistName(turno.especialistaId)}</p>
          </span>
          <span>{formatDate(turno.fecha)}</span>
          <span>{formatHour(turno.hora)} </span>
          <span> {turno.motivoConsulta} </span>
          <span>30min</span>
        </Card>
      )}
    </>
  );
}

export default TurnoCard;
