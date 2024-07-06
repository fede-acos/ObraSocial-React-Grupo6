import { Input, Spinner } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../components/SearchIcon";
import TurnoCard from "../components/TurnoCard";
import { useEntities, useEntity } from "../services/useApi";
import { SpecialistDto } from "../types/SpecialistDto";
import { TurnoDto } from "../types/TurnoDto";
import { TurnoDtoResponse } from "../types/TurnoDtoResponse";

function MisTurnos() {
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useEntities<TurnoDtoResponse>(
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

  const handleEdit = (
    turno: TurnoDtoResponse,
    specialist: SpecialistDto | undefined
  ) => {
    navigate("/turnos", { state: { turno: turno, specialist: specialist } });
  };

  const handleDelete = async (turnoId: number) => {
    await remove.mutateAsync(turnoId.toString());
  };

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  function addSpecialistToTurno(
    turnos: TurnoDtoResponse[] | undefined
  ): (TurnoDtoResponse & SpecialistDto)[] {
    const specialistMap = new Map<number, SpecialistDto>();

    specialistData?.forEach((specialist) => {
      specialistMap.set(specialist.id, specialist);
    });

    return (
      turnos?.map((turno) => {
        const specialist = specialistMap.get(turno.especialistaId);
        return {
          ...turno,
          id: specialist?.id || 1,
          turnoId: turno.turnoId,
          nombre: specialist?.nombre || "Unknown Specialist",
          especialidad: specialist?.especialidad || "Unknown Specialty",
          horarioEntrada: specialist?.horarioEntrada || "Unknown Entry Time",
          horarioSalida: specialist?.horarioSalida || "Unknown Exit Time",
          ubicacion: specialist?.ubicacion || {
            provincia: "Unknown Province",
            ciudad: "Unknown City",
          },
        };
      }) || []
    );
  }

  function filterTurnosBySpecialistName(
    turnos: (TurnoDtoResponse & SpecialistDto)[],
    specialistName: string
  ): (TurnoDtoResponse & SpecialistDto)[] | undefined {
    if (specialistName.length === 0) return turnos;
    return turnos?.filter((turno) =>
      turno.nombre.toLowerCase().includes(specialistName.toLowerCase())
    );
  }

  return (
    <>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <div className="flex justify-center items-center ">
          <div className="flex flex-col gap-4  my-8 w-11/12  justify-center items-center">
            <div className="w-full flex justify-center items-center mb-4">
              <Input
                isClearable={true}
                className="w-full sm:max-w-[44%] flex-grow"
                placeholder="Buscar por especialista.."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
            {filterTurnosBySpecialistName(
              addSpecialistToTurno(data),
              filterValue
            )?.map((turno) => (
              <TurnoCard
                key={turno.turnoId}
                turno={turno}
                loading={loadingSpecialist && isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MisTurnos;
