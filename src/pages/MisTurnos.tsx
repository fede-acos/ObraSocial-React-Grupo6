import { Input } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import TurnoCard from "../components/TurnoCard";
import { useEntities, useEntity } from "../services/useApi";
import { SpecialistDto } from "../types/SpecialistDto";
import { TurnoDtoResponse } from "../types/TurnoDtoResponse";
import { TurnoDto } from "../types/TurnosDto";

function MisTurnos() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useEntities<TurnoDtoResponse>(
    "turnos",
    "http://localhost:8080/turnos"
  );

  const { remove } = useEntity<TurnoDto>(
    "turnos",
    "http://localhost:8080/turnos",
    null
  );

  const { data: specialistData, isLoading: loadingSpecialist } =
    useEntities<SpecialistDto>(
      "especialistas",
      "http://localhost:8080/especialistas"
    );

  const handleEdit = (turno: TurnoDto) => {
    navigate("/turnos", { state: { turno: turno } });
  };

  const handleDelete = async (turnoId: number) => {
    await remove.mutateAsync(turnoId.toString());
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col gap-4 mt-4  w-11/12 xl:w-9/12">
        {data?.map((turno) => (
          <TurnoCard
            key={turno.turnoId}
            turno={turno}
            specialistData={specialistData}
            loadingSpecialist={loadingSpecialist}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default MisTurnos;
