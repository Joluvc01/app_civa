import React, { useEffect, useState } from 'react';
import BusService from '../../services/BusService';
import { Link } from 'react-router-dom';

const BusList: React.FC = () => {
  const [buses, setBuses] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await BusService.getBuses(page, 10);
        setBuses(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error obteniendo listado de buses:', error);
      }
    };

    fetchBuses();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Buses</h1>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-sm font-medium text-gray-600">
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Número de Bus</th>
            <th className="px-6 py-3">Placa</th>
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <tr key={bus.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">{bus.id}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{bus.busNumber}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{bus.plate}</td>
              <td className="px-6 py-4 text-center">
                <Link to={`/bus/${bus.id}`} className="text-blue-500 hover:text-blue-700 font-medium">
                  Ver Detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow disabled:bg-gray-300"
          disabled={page === 0}
        >
          Anterior
        </button>
        <span className="text-lg text-gray-700">
          Página {page + 1} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow disabled:bg-gray-300"
          disabled={page === totalPages - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default BusList;
