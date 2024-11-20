import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BusService from '../../services/BusService';

const BusDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bus, setBus] = useState<any>(null);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await BusService.getBusById(id!);
        setBus(response.data);
      } catch (error) {
        console.error('Error obteniendo detalles del bus:', error);
      }
    };

    if (id) {
      fetchBusDetails();
    }
  }, [id]);

  if (!bus) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-xl font-semibold text-gray-700">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Detalles del Bus</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <strong className="text-lg text-gray-700">ID:</strong>
            <span className="text-gray-500">{bus.id}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-lg text-gray-700">Número de Bus:</strong>
            <span className="text-gray-500">{bus.busNumber}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-lg text-gray-700">Placa:</strong>
            <span className="text-gray-500">{bus.plate}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-lg text-gray-700">Fecha de Creación:</strong>
            <span className="text-gray-500">{new Date(bus.creationDate).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-lg text-gray-700">Capacidad:</strong>
            <span className="text-gray-500">{bus.capacity}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-lg text-gray-700">Características:</strong>
            <span className="text-gray-500">{bus.characteristics}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-lg text-gray-700">Marca:</strong>
            <span className="text-gray-500">{bus.brand.name}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-lg text-gray-700">Estado:</strong>
            <span className={`text-lg font-semibold ${bus.is_active ? 'text-green-600' : 'text-red-600'}`}>
              {bus.is_active ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetail;
