
import { useState, useEffect } from 'react';
import { Settings, Type, Minus, Plus } from 'lucide-react';

interface SettingsProps {
  fontSize: string;
  onFontSizeChange: (size: string) => void;
}

const SettingsTab = ({ fontSize, onFontSizeChange }: SettingsProps) => {
  const fontSizes = [
    { label: 'Small', value: 'text-xs-accessible', size: 'xs' },
    { label: 'Medium', value: 'text-sm-accessible', size: 'sm' },
    { label: 'Large', value: 'text-base-accessible', size: 'base' },
    { label: 'Extra Large', value: 'text-lg-accessible', size: 'lg' },
    { label: 'Maximum', value: 'text-xl-accessible', size: 'xl' }
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center space-x-2 mb-6">
        <Settings size={24} className="text-[#36723f]" />
        <h2 className="text-xl font-semibold text-[#36723f]">Accessibility Settings</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Type size={20} className="text-[#36723f]" />
          <h3 className="text-lg font-medium text-gray-800">Font Size</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-6">
          Adjust the font size to make text more comfortable to read
        </p>

        <div className="space-y-3">
          {fontSizes.map((size) => (
            <button
              key={size.size}
              onClick={() => onFontSizeChange(size.size)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                fontSize === size.size
                  ? 'border-[#36723f] bg-[#36723f] bg-opacity-5 text-[#36723f]'
                  : 'border-gray-200 bg-white hover:border-[#36723f] hover:border-opacity-50 hover:bg-[#36723f] hover:bg-opacity-5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{size.label}</span>
                <span className={`${size.value} text-gray-600`}>
                  Sample text
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-[#36723f] bg-opacity-5 rounded-xl">
          <h4 className="font-medium text-[#36723f] mb-2">Preview</h4>
          <p className={`${fontSizes.find(s => s.size === fontSize)?.value || 'text-sm-accessible'} text-gray-700`}>
            This is how your text will appear throughout the app with the selected font size.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
