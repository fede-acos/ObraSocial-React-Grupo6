import { Input, Spinner } from "@nextui-org/react";
import { useCallback, useState } from "react";
import SearchIcon from "../components/SearchIcon";
import SpecialistCard from "../components/SpecialistCard";
import { useEntities } from "../services/useApi";
import { SpecialistDto } from "../types/SpecialistDto";

function CartillaMedica() {
  const [filterValue, setFilterValue] = useState("");
  const { data, isLoading } = useEntities<SpecialistDto>(
    "especialistas",
    "http://localhost:8080/especialistas"
  );

  function filterSpecialistsCity(
    specialists: SpecialistDto[] | undefined,
    city: string
  ): SpecialistDto[] | undefined {
    if (city.length === 0) return specialists;
    return specialists?.filter((specialist) =>
      specialist.ubicacion.ciudad.toLowerCase().includes(city.toLowerCase())
    );
  }

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

  console.log(filterSpecialistsCity(data, filterValue));
  console.log(filterValue);

  return (
    <>
      {isLoading ? (
        <div>
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          <div className="flex flex-col  lg:flex-row gap-4  items-center justify-center  my-8 container sm:flex-wrap w-11/12 xl:w-5/6">
            <div className="w-full flex justify-center items-center">
              <Input
                isClearable={true}
                className="w-full sm:max-w-[44%] flex-grow"
                placeholder="Buscar por ciudad.."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
            {filterSpecialistsCity(data, filterValue)?.map((specialist) => (
              <SpecialistCard specialist={specialist} key={specialist.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CartillaMedica;
