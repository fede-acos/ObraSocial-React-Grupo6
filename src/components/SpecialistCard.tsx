import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { SpecialistDto } from "../types/SpecialistDto";

function SpecialistCard({ specialist }: { specialist: SpecialistDto }) {
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
        <Button size="md">Reservar Turno</Button>
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
