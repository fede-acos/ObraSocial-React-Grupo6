import { Button } from "@nextui-org/react";
import { useEntities, useEntity } from "../services/useApi";
import { SpecialistDto, useSpecialist } from "../services/useSpecialist";
function Home() {
  const { data, isLoading, isError } = useEntities<SpecialistDto>(
    "specialist",
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

  const handleAdd = async (newEntity: SpecialistDto) => {
    await add.mutateAsync(newEntity);
  };
  const handleRemove = async () => {
    await remove.mutateAsync("6");
  };

  /*   const { save, remove, getAll, update } = useSpecialist();

  const { data, isLoading, isError } = getAll();
  */

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error</h1>;

  console.log(data);

  return (
    <div>
      Home
      <Button onClick={() => handleAdd(test)}>AGREGAR </Button>
      <Button onClick={() => handleRemove()}>Remover </Button>
    </div>
  );
}

export default Home;
