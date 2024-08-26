// src/pages/SearchDevice.jsx
import React, { useState } from 'react';
import api from '../utils/api';

const SearchDevice = () => {
  const [imei, setImei] = useState('');
  const [device, setDevice] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/devices/search/${imei}`);
      if (response.data) {
        setDevice(response.data);
        setError('');
      } else {
        setDevice(null);
        setError('No se encontró ningún dispositivo con ese IMEI.');
      }
    } catch (err) {
      setError('Error al buscar el dispositivo. Por favor, intenta de nuevo.', err);
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Buscar Dispositivo por IMEI</h2>
      <form 
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg box-border"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="Ingresa el IMEI"
          required
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Buscar
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {device && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-6 box-border">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Información del Dispositivo:</h3>
          <p><strong>Modelo:</strong> {device.device.modelo}</p>
          <p><strong>Color:</strong> {device.device.color}</p>
          <p><strong>IMEI:</strong> {device.device.imei}</p>
          <p><strong>Recompensa:</strong> {device.device.recompensa}</p>
          <p><strong>Descripción:</strong> {device.device.descripcion}</p>
          <p><strong>Registrado Por:</strong> N/A</p>
        </div>
      )}
    </div>
  );
};

export default SearchDevice;
