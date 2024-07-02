import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosConfig";

//TODO
//remover los console.log cuando este todo OK.
//mover los types a otra carpeta
//quizas agregar optimistic updates

export interface SpecialistDto {
  nombre: string;
  especialidad: string;
  horarioEntrada: string;
  horarioSalida: string;
  ubicacion: {
    provincia: string;
    ciudad: string;
  };
}

interface UpdateSpecialistDto {
  id: string;
  specialist: SpecialistDto;
}

export function useSpecialist() {
  const queryClient = useQueryClient();

  const getAll = () => {
    return useQuery({
      queryKey: ["specialists"],
      queryFn: getAllSpecialist,
    });
  };

  const remove = () => {
    return useMutation<void, Error, number>({
      mutationFn: (id: number) => deleteSpecialist(id),
      onSuccess: () => {
        console.log("Specialist deleted successfully");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const save = () => {
    return useMutation<SpecialistDto, Error, SpecialistDto>({
      mutationFn: (especialist: SpecialistDto) => saveSpecialist(especialist),
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const update = () => {
    return useMutation<SpecialistDto, Error, UpdateSpecialistDto>({
      mutationFn: (UpdatedSpecialist: UpdateSpecialistDto) =>
        updateSpecialist(UpdatedSpecialist),
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return { getAll, save, update, remove };
}

const saveSpecialist = async (
  specialist: SpecialistDto
): Promise<SpecialistDto> => {
  const { data } = await axiosInstance.post("especialistas/", specialist);
  return data;
};

const getAllSpecialist = async (): Promise<SpecialistDto[]> => {
  const response = await axiosInstance.get("especialistas/");
  console.log(response);
  return response.data;
};

const deleteSpecialist = async (id: number): Promise<void> => {
  await axiosInstance.delete(`especialistas/${id}`);
};

const updateSpecialist = async (UpdatedSpecialist: UpdateSpecialistDto) => {
  const { data } = await axiosInstance.put(
    `especialistas/${UpdatedSpecialist.id}`,
    UpdatedSpecialist.specialist
  );
  return data;
};
