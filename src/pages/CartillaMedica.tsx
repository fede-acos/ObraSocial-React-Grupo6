import { Spinner } from "@nextui-org/react";
import SpecialistCard from "../components/SpecialistCard";
import { useEntities } from "../services/useApi";
import { SpecialistDto } from "../types/SpecialistDto";
function CartillaMedica() {
  const { data, isLoading } = useEntities<SpecialistDto>(
    "especialistas",
    "http://localhost:8080/especialistas"
  );

  return (
    <>
      {isLoading ? (
        <div>
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          <div className="flex flex-col  lg:flex-row gap-4  items-center justify-center  my-8 container sm:flex-wrap w-11/12 xl:w-5/6">
            {data?.map((specialist) => (
              <SpecialistCard specialist={specialist} key={specialist.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CartillaMedica;
