import React from 'react';
import ListaEspecialistas from '../modules/listaEspecialistas';


const CartillaMedica: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cartilla Médica</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <ListaEspecialistas />
        </div>
      </div>
    </div>
  );
};

export default CartillaMedica;