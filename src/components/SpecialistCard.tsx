import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { SpecialistDto } from "../types/SpecialistDto";
import { useNavigate } from "react-router-dom";

function SpecialistCard({ specialist }: { specialist: SpecialistDto }) {
  
  const navigate = useNavigate();
  const handlePedirTurno = (specialist : SpecialistDto) => {
    navigate('/turnos', { state: { specialist } });
  };

  return (
    <Card className="w-full sm:w-96 ">
      <CardHeader className="flex justify-between">
        <div className="flex gap-4">
          <Avatar showFallback size="sm" />
          <div>
            <h1>{specialist.nombre}</h1>
            <h2>{specialist.especialidad}</h2>
          </div>
        </div>
        <Button size="md" 
                onClick={() => handlePedirTurno(specialist)} >Reservar Turno</Button>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          {specialist.ubicacion.ciudad} {specialist.ubicacion.provincia}
        </p>
      </CardBody>
    </Card>
  );
}

export default SpecialistCard;
