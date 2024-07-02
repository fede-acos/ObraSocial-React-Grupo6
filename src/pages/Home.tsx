import { Button, Card, CardBody } from "@nextui-org/react";
import { useEntities, useEntity } from "../services/useApi";
import { SpecialistDto } from "../services/useSpecialist";
function Home() {
  const { data, isLoading, isError } = useEntities<SpecialistDto>(
    "especialistas",
    "http://localhost:8080/especialistas"
  );

  const { add, update, remove } = useEntity<SpecialistDto>(
    "specialist",
    "http://localhost:8080/especialistas",
    null
  );

  const test = {
    nombre: "fede",
    especialidad: "test",
    horarioEntrada: "10:00:00",
    horarioSalida: "12:00:00",
    ubicacion: {
      provincia: "corrientes",
      ciudad: "corrientes",
    },
  };

  type TurnoDto = {
    turnoId: number;
    pacienteId: number;
    especialistaId: number;
    fecha: string;
    hora: string;
    motivoConsulta: string;
  };

  const handleAdd = async (newEntity: SpecialistDto) => {
    await add.mutateAsync(newEntity);
  };
  const handleRemove = async () => {
    await remove.mutateAsync("102");
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  console.log(data);
  return (
    <div className="container">
      <Button onClick={() => handleAdd(test)}>Agregar</Button>
      <Button onClick={() => handleRemove()}>Eliminar</Button>

      <div className="mt-10">
        {data?.map((specialist) => (
          <div key={specialist.especialidad + specialist.nombre}>
            <Card>
              <CardBody>
                {`${specialist.nombre} ${specialist.especialidad}`}
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
