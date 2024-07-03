import TurnoCard from "../components/TurnoCard";
import { useEntities } from "../services/useApi";
import { SpecialistDto } from "../types/SpecialistDto";
import { TurnoDtoResponse } from "../types/TurnoDtoResponse";

function MisTurnos() {
  const { data, isLoading, isError } = useEntities<TurnoDtoResponse>(
    "turnos",
    "http://localhost:8080/turnos"
  );

  const { data: specialistData, isLoading: loadingSpecialist } =
    useEntities<SpecialistDto>(
      "especialistas",
      "http://localhost:8080/especialistas"
    );

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col gap-4 mt-4  w-11/12 xl:w-9/12">
        {data?.map((turno) => (
          <TurnoCard
            key={turno.turnoId}
            turno={turno}
            specialistData={specialistData}
            loadingSpecialist={loadingSpecialist}
          />
        ))}
      </div>
    </div>
  );
}

export default MisTurnos;
