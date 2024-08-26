// PaymentPage.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Navbar from '../components/Navbar';
import { FaCcVisa, FaCcMastercard, FaWhatsapp } from 'react-icons/fa';
import api from '../utils/api'; // Asegúrate de tener configurada tu API en esta ruta
import { useNavigate } from 'react-router-dom';

const initialOptions = {
    "client-id": "Aby9u5nJBHrzaI1ni2fiZRpwkP-Schgw40V7GuqTPO7TPoTxSsT9Z564EsOxfHKLtGGPQz7wOzOfahMk", // Reemplaza con tu Client ID de PayPal
    currency: "USD",
    intent: "capture",
};

const PaymentPage = () => {
    const navigate = useNavigate();

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/18294515303', '_blank');
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Complete su Pago</h1>
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                    <p className="text-lg mb-4">Por favor, complete el pago para continuar usando el software.</p>

                    {/* Mostrar el monto a pagar */}
                    <div className="text-2xl font-bold text-gray-700 mb-4">
                        Monto a Pagar: <span className="text-green-600">USD 10.00</span>
                    </div>

                    <div className="flex justify-center mb-4">
                        <FaCcVisa className="text-4xl text-blue-600 mx-2 animate-pulse" />
                        <FaCcMastercard className="text-4xl text-red-600 mx-2 animate-pulse" />
                    </div>

                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: '10.00', // Monto a pagar
                                        },
                                    }],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                return actions.order.capture().then(async (details) => {
                                    alert(`Transaction completed by ${details.payer.name.given_name}`);

                                    // Recuperar el userId del sessionStorage
                                    const userId = sessionStorage.getItem('userId');
                                    if (userId) {
                                        await handlePaymentSuccess(userId);
                                    } else {
                                        console.error('User ID not found in sessionStorage.');
                                    }
                                });
                            }}
                            onError={(err) => {
                                console.error('Error processing payment:', err);
                            }}
                        />
                    </PayPalScriptProvider>

                    <button
                        onClick={handleWhatsAppClick}
                        className="mt-6 flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full animate-bounce">
                        <FaWhatsapp className="text-2xl mr-2" />
                        Iniciar Chat en WhatsApp
                    </button>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
