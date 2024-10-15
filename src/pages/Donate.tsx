import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, CreditCard } from 'lucide-react';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    paypal: any;
  }
}

const Donate: React.FC = () => {
  const [amount, setAmount] = useState('');

  const handleMPesaDonation = async () => {
    try {
      const response = await fetch('http://localhost/portfolio-api/mpesa-donation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const result = await response.json();
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Donation Successful',
          text: 'Thank you for your donation via M-Pesa!',
        });
      } else {
        throw new Error('M-Pesa donation failed');
      }
    } catch (error) {
      console.error('Error processing M-Pesa donation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to process M-Pesa donation. Please try again later.',
      });
    }
  };

  React.useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          Swal.fire({
            icon: 'success',
            title: 'Donation Successful',
            text: 'Thank you for your donation via PayPal!',
          });
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to process PayPal donation. Please try again later.',
          });
        }
      }).render('#paypal-button-container');
    }
  }, [amount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Support My Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Coffee className="mr-2" /> Buy Me a Coffee
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you enjoy my work and want to support me, consider buying me a coffee. Your support helps me continue creating and improving my projects.
          </p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full mb-4 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handleMPesaDonation}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-green-600 transition duration-300"
          >
            Donate via M-Pesa
          </button>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <CreditCard className="mr-2" /> Make a Donation
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your generous donation helps fund my ongoing projects and allows me to dedicate more time to open-source development.
          </p>
          <div id="paypal-button-container"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Donate;