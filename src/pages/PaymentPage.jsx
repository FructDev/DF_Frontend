import React from 'react';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Navbar from '../components/Navbar';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../utils/api'; // Asegúrate de tener configurada tu API en esta ruta
import { useNavigate } from 'react-router-dom';
import BancoPopularLogo from '../assets/banco-popular.png'; // Asegúrate de que los logos estén en tu carpeta de assets
import BancoBHDLogo from '../assets/banco-bhd.png'; // Asegúrate de que los logos estén en tu carpeta de assets

// const initialOptions = {
//     "client-id": "Aby9u5nJBHrzaI1ni2fiZRpwkP-Schgw40V7GuqTPO7TPoTxSsT9Z564EsOxfHKLtGGPQz7wOzOfahMk", // Reemplaza con tu Client ID de PayPal
//     currency: "USD",
//     intent: "capture",
// };

const PaymentPage = () => {
    const navigate = useNavigate();

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/18297280569', '_blank');
    };

    const handlePaymentSuccess = async (userId) => {
        try {
            await api.patch(`/payment/${userId}/paid`);
            // Actualiza el estado del usuario en localStorage
            const user = JSON.parse(localStorage.getItem('user')) || {};
            user.hasPaid = true;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/login'); // Redirige a la página de login
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Complete su Pago</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <p className="text-lg mb-4">Para continuar usando el software, por favor realice un pago de:</p>
          <div className="text-3xl font-bold text-green-600 mb-6">DOP 500.00</div>

          <div className="flex flex-col items-start mb-6">
            <div className="flex items-center mb-4">
              <img src={BancoPopularLogo} alt="Banco Popular" className="h-10 w-auto mr-4" />
              <div>
                <p className="text-lg font-bold text-gray-800">Cuenta Banco Popular:</p>
                <p className="text-lg">XXXX-XXXX-XXXX-XXXX</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={BancoBHDLogo} alt="Banco BHD" className="h-10 w-auto mr-4" />
              <div>
                <p className="text-lg font-bold text-gray-800">Cuenta Banco BHD León:</p>
                <p className="text-lg">YYYY-YYYY-YYYY-YYYY</p>
              </div>
            </div>
          </div>

          <p className="text-lg mb-6">Una vez realizado el pago, envíe un mensaje por WhatsApp con el comprobante para activar su cuenta.</p>
          <button 
            onClick={handleWhatsAppClick} 
            className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full animate-bounce"
          >
            <FaWhatsapp className="text-2xl mr-2" />
            Iniciar Chat en WhatsApp
          </button>
        </div>
      </div>
    </>
    );
};

export default PaymentPage;
