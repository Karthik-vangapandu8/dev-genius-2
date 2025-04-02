'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const UPIPayment = () => {
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const upiId = "9948929742@ybl";
  const amount = "1000";
  const upiLink = `upi://pay?pa=${upiId}&pn=Dev%20Genius&am=${amount}&cu=INR`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      setTimeout(() => {
        window.location.reload();
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
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="text-center space-y-6">
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
            <button
              onClick={handlePaymentSuccess}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-200"
            >
              I've Completed the Payment
            </button>
            
            {paymentStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center space-x-2 text-green-500"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Payment successful! Redirecting...</span>
              </motion.div>
            )}
            
            {paymentStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center space-x-2 text-red-500"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Payment verification failed. Please try again.</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UPIPayment;
