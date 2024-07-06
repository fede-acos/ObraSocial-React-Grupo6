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

  const entity = useQuery<T, Error>({
    queryKey: [key, id],
    queryFn: async (): Promise<T> => {
      const { data } = await axiosInstance.get<T>(`${url}/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const add = useMutation<T, Error, T>({
    mutationFn: async (entity: T): Promise<T> => {
      const { data } = await axiosInstance.post<T>(url, entity);
      return data;
    },
    onSuccess: () => {
      invalidateActive();
    },
  });

  const update = useMutation<T, Error, T>({
    mutationFn: async (entity: T): Promise<T> => {
      const { data } = await axiosInstance.put<T>(`${url}/${id}`, entity);
      return data;
    },
    onSuccess: () => {
      invalidateActive();
    },
  });

  const remove = useMutation<string, Error, string>({
    mutationFn: async (id: string): Promise<string> => {
      await axiosInstance.delete<T>(`${url}/${id}`);
      return id;
    },
    onSuccess: (deletedEntity) => {
      invalidateActive();
    },
    onSettled: () => {
      invalidateActive();
    },
    onMutate: async (deletedEntity) => {
      await queryClient.cancelQueries({ queryKey: [key], exact: true });

      const previousEntities = queryClient.getQueryData<T[]>([key]);

      if (previousEntities) {
        queryClient.setQueryData<T[]>([key], (old) =>
          old ? old.filter((entity) => entity !== deletedEntity) : []
        );
      }

      return { previousEntities };
    },
  });
  return {
    entity,
    add,
    update,
    remove,
  };
};
