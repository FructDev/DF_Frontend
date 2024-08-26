import React, { useState } from 'react';
import DeviceFormModal from './DeviceFormModal';
import api from '../utils/api';

const DeviceFormTrigger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    modelo: '',
    color: '',
    imei: '',
    recompensa: '',
    descripcion: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { modelo, color, imei, recompensa, descripcion } = formData;
    if (!modelo || !color || !imei || !recompensa || !descripcion) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      await api.post('/devices/register', formData);
      setSuccess('Dispositivo registrado con éxito.');
      setFormData({
        modelo: '',
        color: '',
        imei: '',
        recompensa: '',
        descripcion: '',
      });
      setError('');
    } catch (error) {
      console.error('Error registrando dispositivo:', error);
      setError('Error registrando el dispositivo.');
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Registrar Dispositivo Nuevo
      </button>
      <DeviceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        success={success}
      />
    </div>
  );
};

export default DeviceFormTrigger;
