import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get('/devices');
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div>
      <h3>Lista de Dispositivos</h3>
      <ul>
        {devices.map((device) => (
          <li key={device._id}>
            {device.modelo} - {device.color} - IMEI: {device.imei}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceList;
