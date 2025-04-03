'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, AlertCircle, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import UserRegistrationForm from './UserRegistrationForm';
import { useAuth } from '@/context/AuthContext';

interface UPIPaymentProps {
  onClose?: () => void;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
}

const UPIPayment = ({ onClose }: UPIPaymentProps) => {
  const { autoLogin } = useAuth();
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [showQR, setShowQR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const upiId = "9948929742@ybl";
  const amount = "1000";
  const upiLink = `upi://pay?pa=${upiId}&pn=Dev%20Genius&am=${amount}&cu=INR&tr=${transactionId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegistration = async (userData: UserData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      setCredentials(data.credentials);
      setShowQR(true);
    } catch (error) {
      console.error('Registration error:', error);
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showQR) {
      // Generate transaction ID
      const newTransactionId = 'TR_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      setTransactionId(newTransactionId);

      // Start payment verification
      startPaymentVerification(newTransactionId);
    }
  }, [showQR]);

  const startPaymentVerification = async (trId: string) => {
    try {
      // Register payment attempt
      await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: trId,
          upiId,
          amount
        }),
      });

      // Start polling for payment status
      const checkPaymentStatus = async () => {
        const response = await fetch(`/api/payment/verify?transactionId=${trId}`);
        const data = await response.json();

        if (data.status === 'completed') {
          handlePaymentSuccess();
        } else if (data.status === 'pending') {
          // Continue polling every 5 seconds
          setTimeout(checkPaymentStatus, 5000);
        }
      };

      // Start checking payment status
      checkPaymentStatus();
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus('error');
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await fetch('/api/enrollment', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to update enrollment');
      }

      setPaymentStatus('success');

      // Auto login after successful payment
      if (credentials) {
        await autoLogin(credentials);
      }

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="text-center space-y-6">
          {!showQR ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Register to Continue</h2>
              <UserRegistrationForm onSubmit={handleRegistration} isLoading={isLoading} />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Your Payment</h2>
              
              <div className="flex justify-center mb-4">
                <QRCodeSVG 
                  value={upiLink}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="rounded-lg bg-white p-2"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Amount: ₹{amount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">UPI ID:</p>
                <div className="flex items-center justify-center space-x-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-blue-600 dark:text-blue-400">
                    {upiId}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {paymentStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-center text-green-500 space-x-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Payment successful!</span>
                    </div>
                    
                    {credentials && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Your Login Credentials</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Username: <span className="font-mono">{credentials.username}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Password: <span className="font-mono">{credentials.password}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Please check your email for detailed instructions.
                        </p>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600">Redirecting in a moment...</p>
                  </motion.div>
                )}

                {paymentStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center text-red-500 space-x-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UPIPayment;
