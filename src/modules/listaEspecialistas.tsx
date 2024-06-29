import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/getEspecialistas';
import { Especialista } from '../models/Especialista';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, CircularProgress} from "@nextui-org/react";


const ListaEspecialistas: React.FC = () => {
  const [data, setData] = useState<Especialista[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData('/especialistas');
        setData(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress size="lg" label="Loading..." />
      </div>
    );
  }

  return ( // falta cambiar avatar
    <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {data.map((item, index) => (
        <Card key={index} className="m-2 w-full max-w-xs">
       <CardHeader className="justify-between">
         <div className="flex gap-5">
           <Avatar isBordered radius="full" size="md" src="https://xsgames.co/randomusers/avatar.php?g=male" /> 
           <div className="flex flex-col gap-1 items-start justify-center">
             <h4 className="text-small font-semibold leading-none text-default-600">{item.nombre}</h4>
             <h5 className="text-small tracking-tight text-default-400">{item.especialidad}</h5>
           </div>
         </div>
         <Button
           color="primary"
           radius="full"
           size="sm"
           onPress={() => {index}}
         >
            Reservar turno
         </Button>
       </CardHeader>
       <CardBody className="px-3 py-0 text-small text-default-600">
         <p>
           {item.ubicacion.provincia} - {item.ubicacion.ciudad}
         </p>
       </CardBody>
       <CardFooter className="gap-3">
         <div className="flex gap-1">
           <p className="font-semibold text-default-600 text-small">Horario Entrada:</p>
           <p className=" text-default-600 text-small">{item.horarioEntrada}</p>
         </div>
         <div className="flex gap-1">
           <p className="font-semibold text-default-600 text-small">Horario Salida:</p>
           <p className="text-default-600 text-small">{item.horarioSalida}</p>
         </div>
       </CardFooter>
     </Card>
    ))}
  </div>
)};

export default ListaEspecialistas;