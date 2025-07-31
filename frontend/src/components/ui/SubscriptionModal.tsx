'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  X, 
  CreditCard, 
  Shield, 
  Zap,
  Clock,
  Users,
  Star
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    name: string;
    icon: string;
    color: string;
  };
  plan: {
    name: string;
    price: string;
    features: string[];
  };
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  service,
  plan
}) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Plan details, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      // Mock subscription API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep(3);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{service.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                <p className="text-gray-600">{plan.name} Plan</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Close modal"
              aria-label="Close subscription modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {plan.price}
                  <span className="text-lg text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-gray-600">Billed monthly, cancel anytime</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">What&apos;s included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-900">30-Day Free Trial</span>
                </div>
                <p className="text-purple-700 text-sm">
                  Try {service.name} risk-free for 30 days. Cancel anytime during your trial.
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Free Trial
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Choose Payment Method
                </h4>
                <p className="text-gray-600">You won&apos;t be charged until your trial ends</p>
              </div>

              <div className="space-y-3">
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <div className="w-4 h-4 border-2 border-purple-500 rounded-full flex items-center justify-center">
                      {paymentMethod === 'card' && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'paypal' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        P
                      </div>
                      <span className="font-medium">PayPal</span>
                    </div>
                    <div className="w-4 h-4 border-2 border-purple-500 rounded-full flex items-center justify-center">
                      {paymentMethod === 'paypal' && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : (
                    'Confirm Subscription'
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Welcome to {service.name}!
                </h4>
                <p className="text-gray-600">
                  Your free trial has started. You now have access to all {plan.name} features.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">30 Days</div>
                    <div className="text-xs text-gray-600">Free Trial</div>
                  </div>
                  <div>
                    <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">Full Access</div>
                    <div className="text-xs text-gray-600">All Features</div>
                  </div>
                  <div>
                    <Users className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">Support</div>
                    <div className="text-xs text-gray-600">24/7 Help</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => window.open('/ai/emoai', '_blank')}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Start Using {service.name}
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionModal;
