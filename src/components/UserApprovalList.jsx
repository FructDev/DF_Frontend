import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const UserApprovalList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await api.get('/users/pending');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (userId) => {
    try {
      await api.patch(`/users/approve/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

    const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Usuarios Pendientes de Aprobación</h3>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg box-border">
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li key={user._id} className="mb-4 flex justify-between items-center border-b border-gray-300 pb-2">
              <div>
                <p className="text-gray-800 font-medium">Usuario - {user.usuario}</p>
                <p className="text-gray-800 font-medium">Nombre - {user.nombre} {user.apellido}</p>
                <p className="text-gray-800 font-medium">Direccion - {user.direccionTienda}</p>
                <p className="text-gray-800 font-medium">Telefono - {user.telefonoTienda}</p>
              </div>
              <button 
                onClick={() => approveUser(user._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Aprobar
              </button>
              <button 
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
              >
                  Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserApprovalList;
