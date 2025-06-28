import { useState } from 'react';
import { User, MapPin, ArrowRight } from 'lucide-react';

interface SignUpPageProps {
  onSignUpComplete: (userData: { name: string; zipcode: string }) => void;
}

const SignUpPage = ({ onSignUpComplete }: SignUpPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    zipcode: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    zipcode: ''
  });

  const validateForm = () => {
    const newErrors = { name: '', zipcode: '' };
    let isValid = true;

    // Validate name (at least 2 words)
    const nameParts = formData.name.trim().split(' ');
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
      isValid = false;
    } else if (nameParts.length < 2) {
      newErrors.name = 'Please enter your first and last name';
      isValid = false;
    }

    // Validate zipcode (5 digits)
    const zipcodeRegex = /^\d{5}$/;
    if (!formData.zipcode.trim()) {
      newErrors.zipcode = 'Please enter your zipcode';
      isValid = false;
    } else if (!zipcodeRegex.test(formData.zipcode)) {
      newErrors.zipcode = 'Please enter a valid 5-digit zipcode';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSignUpComplete(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bad3de] to-[#a8c8d4] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#36723f] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">UT</span>
          </div>
          <h1 className="text-3xl font-bold text-[#36723f] mb-2">Welcome to UpThrift</h1>
          <p className="text-gray-600">Join our community of conscious clothing sharers</p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your first and last name"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#36723f] focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Zipcode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zipcode *
            </label>
            <div className="relative">
              <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.zipcode}
                onChange={(e) => handleInputChange('zipcode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="12345"
                maxLength={5}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#36723f] focus:border-transparent transition-colors ${
                  errors.zipcode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.zipcode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
            )}
          </div>

          {/* Terms */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-xs text-gray-600 text-center">
              By continuing, you agree to UpThrift's{' '}
              <span className="text-[#36723f] font-medium">Terms of Service</span> and{' '}
              <span className="text-[#36723f] font-medium">Privacy Policy</span>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#36723f] text-white py-4 rounded-xl font-medium hover:bg-[#2d5a33] transition-colors flex items-center justify-center space-x-2 group"
          >
            <span>Continue to Payment</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🌱 Join thousands sharing clothes sustainably
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;