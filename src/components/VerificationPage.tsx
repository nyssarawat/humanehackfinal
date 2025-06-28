import { useState } from 'react';
import { Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface VerificationPageProps {
  userData: { name: string; zipcode: string };
  onEnterApp: () => void;
}

const VerificationPage = ({ userData, onEnterApp }: VerificationPageProps) => {
  const [showDemoButton, setShowDemoButton] = useState(false);

  // Show demo button after 3 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setShowDemoButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bad3de] to-[#a8c8d4] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-[#36723f] mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you {userData.name.split(' ')[0]}, your membership is being processed.
        </p>

        {/* Verification Status */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield size={24} className="text-yellow-600" />
            <h2 className="text-lg font-semibold text-yellow-800">Identity Verification</h2>
          </div>
          
          <p className="text-yellow-700 mb-4">
            We're manually verifying your identity to ensure a safe community for everyone.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-yellow-600">
            <Clock size={16} />
            <span className="text-sm font-medium">This might take up to one business day</span>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">What happens next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#36723f] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
              <p className="text-sm text-gray-600">We verify your identity using your provided information</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#36723f] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
              <p className="text-sm text-gray-600">You'll receive an email confirmation once approved</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#36723f] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
              <p className="text-sm text-gray-600">Start sharing and discovering amazing clothes!</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-700">
            <strong>Questions?</strong> Contact us at{' '}
            <span className="font-medium">support@upthrift.com</span>
          </p>
        </div>

        {/* Demo Button (appears after 3 seconds) */}
        {showDemoButton && (
          <div className="border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500 mb-3">For demo purposes only:</p>
            <button
              onClick={onEnterApp}
              className="w-full bg-gray-600 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Skip Verification & Enter App</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6">
          <p className="text-xs text-gray-500">
            🌱 Welcome to the UpThrift community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;