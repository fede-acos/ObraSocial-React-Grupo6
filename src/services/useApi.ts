import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosConfig";

export const useEntities = <T>(key: string, url: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: async (): Promise<T[]> => {
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};

export const useEntity = <T>(
  key: string,
  url: string,
  id: string | undefined | null
) => {
  const queryClient = useQueryClient();

  const invalidateActive = () =>
    queryClient.invalidateQueries({
      queryKey: [key, "query"],
      type: "active",
    });

  const add = useMutation<T, Error, T>({
    mutationFn: async (entity: T): Promise<T> => {
      const { data } = await axiosInstance.post<T>(url, entity);
      return data;
    },
    onSuccess: (addedEntity) => {
      invalidateActive();
      //TODO Optimistic Updates.
    },
  });

  const update = useMutation<T, Error, T>({
    mutationFn: async (entity: T): Promise<T> => {
      const { data } = await axiosInstance.put<T>(`${url}/${id}`, entity);
      return data;
    },
    onSuccess: (addedEntity) => {
      invalidateActive();
      //TODO Optimistic Updates.
    },
  });

  const remove = useMutation<string, Error, string>({
    mutationFn: async (id: string): Promise<string> => {
      await axiosInstance.delete<T>(`${url}/${id}`);
      return id; //quizas nuestra api deberia devolver el id del elemento borrado.
    },
    onSuccess: (deleted) => {
      invalidateActive();
      //TODO Optimistic Updates.
    },
  });
  return {
    add,
    update,
    remove,
  };
};
