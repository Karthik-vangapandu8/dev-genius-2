'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const UPIPayment = () => {
  const [copied, setCopied] = useState(false);
  const upiId = "9948929742@ybl";
  const upiLink = `upi://pay?pa=${upiId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Make Payment
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Scan QR code or use UPI ID
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center p-4 bg-white rounded-lg">
        <QRCodeSVG 
          value={upiLink}
          size={200}
          level="H"
          includeMargin={true}
          className="rounded-lg"
        />
      </div>

      {/* UPI ID */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          UPI ID
        </p>
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg">
          <span className="text-gray-900 dark:text-white font-medium">
            {upiId}
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
        <h4 className="font-medium text-gray-900 dark:text-white">Steps to pay:</h4>
        <ol className="list-decimal list-inside space-y-1">
          <li>Open your UPI app (GPay, PhonePe, Paytm, etc.)</li>
          <li>Scan the QR code or enter the UPI ID</li>
          <li>Enter the amount and complete the payment</li>
          <li>Keep the transaction ID for reference</li>
        </ol>
      </div>

      {/* Support */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        Having trouble? Contact support at support@devgenius.com
      </p>
    </div>
  );
};

export default UPIPayment;
