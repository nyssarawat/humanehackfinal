import { useState } from 'react';
import { CreditCard, Smartphone, DollarSign, Shield, ArrowLeft, Check } from 'lucide-react';

interface PaymentPageProps {
  userData: { name: string; email: string; phone: string; zipcode: string };
  onPaymentComplete: () => void;
  onBack: () => void;
}

const PaymentPage = ({ userData, onPaymentComplete, onBack }: PaymentPageProps) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: DollarSign,
      description: 'Pay with your PayPal account'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'Touch ID or Face ID'
    },
    {
      id: 'venmo',
      name: 'Venmo',
      icon: Smartphone,
      description: 'Pay with Venmo'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bad3de] to-[#a8c8d4] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#36723f]">Complete Payment</h1>
            <p className="text-gray-600 text-sm">Hi {userData.name.split(' ')[0]}!</p>
          </div>
        </div>

        {/* User Info Summary */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Account Information</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Location:</strong> {userData.zipcode}</p>
          </div>
        </div>

        {/* Membership Info */}
        <div className="bg-[#36723f] bg-opacity-5 p-4 rounded-xl mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-[#36723f]">UpThrift Membership</span>
            <span className="text-2xl font-bold text-[#36723f]">$20</span>
          </div>
          <p className="text-sm text-gray-600">One-time verification fee</p>
          <div className="mt-3 space-y-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Check size={16} className="text-green-600" />
              <span>Verified community access</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Check size={16} className="text-green-600" />
              <span>Safe & trusted exchanges</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Check size={16} className="text-green-600" />
              <span>Premium support</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          <h3 className="font-medium text-gray-800">Choose Payment Method</h3>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 border-2 rounded-xl transition-all ${
                  selectedMethod === method.id
                    ? 'border-[#36723f] bg-[#36723f] bg-opacity-5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={24} className={selectedMethod === method.id ? 'text-[#36723f]' : 'text-gray-600'} />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-800">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="w-6 h-6 bg-[#36723f] rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Card Details (if card selected) */}
        {selectedMethod === 'card' && (
          <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-800">Card Details</h4>
            <div>
              <input
                type="text"
                placeholder="Card Number"
                value={cardData.number}
                onChange={(e) => setCardData(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                maxLength={19}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36723f] focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => setCardData(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                maxLength={5}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36723f] focus:border-transparent"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cardData.cvv}
                onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                maxLength={4}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36723f] focus:border-transparent"
              />
            </div>
            <input
              type="text"
              placeholder="Cardholder Name"
              value={cardData.name}
              onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36723f] focus:border-transparent"
            />
          </div>
        )}

        {/* Security Notice */}
        <div className="flex items-center space-x-2 mb-6 p-3 bg-blue-50 rounded-lg">
          <Shield size={20} className="text-blue-600" />
          <p className="text-sm text-blue-700">
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className="w-full bg-[#36723f] text-white py-4 rounded-xl font-medium hover:bg-[#2d5a33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Pay $20</span>
              <CreditCard size={20} />
            </>
          )}
        </button>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;