import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TurnosForm from "../components/turnosForm";
import { useEntities, useEntity } from "../services/useApi";
import { TurnoDtoResponse } from "../types/TurnoDtoResponse";
import { TurnoDto } from "../types/TurnosDto";
import "./styles/turnos.css";

function Turnos() {
  const location = useLocation();
  const navigate = useNavigate();

  const { turno } = location.state;

  const { data, isLoading } = useEntities<TurnoDto>(
    "turnos",
    "http://localhost:8080/turnos"
  );

  const { add, update } = useEntity<TurnoDto>(
    "turno",
    "http://localhost:8080/turnos",
    turno ? turno.turnoId.toString() : null
  );

  useEffect(() => {
    if (!location.state || !location.state.specialist) {
      navigate("/cartilla");
    }
  }, [location.state, navigate]);

  if (!location.state || !location.state.specialist) {
    return null;
  }

  const { specialist } = location.state;

  console.log(turno, specialist);

  const handleAdd = async (newEntity: TurnoDto) => {
    await add.mutateAsync(newEntity);
  };

  const handleUpdate = async (newEntity: TurnoDtoResponse) => {
    await update.mutateAsync(newEntity);
  };

  if (isLoading || !data) {
    return (
      <div>
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="container-turnos">
      <div className="centered-content">
        <h2>Turnos con {specialist.nombre}</h2>
        <TurnosForm
          specialist={specialist}
          turnos={data}
          turno={turno}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
        />
      </div>
    </div>
  );
}

export default Turnos;
