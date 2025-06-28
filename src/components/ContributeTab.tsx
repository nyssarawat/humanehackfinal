import { useState } from 'react';
import { Camera, MapPin, Upload, X, Plus } from 'lucide-react';

interface ContributeTabProps {
  fontSize?: string;
  onContributionSubmit?: (contributionData: any) => void;
}

const ContributeTab = ({ fontSize = 'sm', onContributionSubmit }: ContributeTabProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    size: '',
    color: '',
    style: '',
    type: '',
    condition: '',
    location: 'San Ramon, CA'
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Pink', 'Brown', 'Gray'];
  const styles = ['Casual', 'Formal', 'Vintage', 'Trendy', 'Sporty', 'Bohemian'];
  const types = ['Jacket', 'Sweater', 'Dress', 'Jeans', 'Shoes', 'Shirt', 'Skirt', 'Shorts', 'Pants', 'Accessories'];
  const conditions = ['Like New', 'Excellent', 'Good', 'Fair'];

  const getFontSizeClass = () => {
    const fontSizeMap = {
      xs: 'text-xs-accessible',
      sm: 'text-sm-accessible', 
      base: 'text-base-accessible',
      lg: 'text-lg-accessible',
      xl: 'text-xl-accessible'
    };
    return fontSizeMap[fontSize as keyof typeof fontSizeMap] || 'text-sm-accessible';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create contribution data with image URLs
    const contributionData = {
      ...formData,
      image: imagePreviewUrls[0] || 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop', // Use first image or default
      images: imagePreviewUrls.length > 0 ? imagePreviewUrls : ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop'],
      distance: Math.floor(Math.random() * 5) + 1 // Random distance 1-5 miles
    };

    // Call the callback to add to contributions
    if (onContributionSubmit) {
      onContributionSubmit(contributionData);
    }

    // Show success message
    alert('Contribution posted successfully! Your item is now available for others to collect.');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      size: '',
      color: '',
      style: '',
      type: '',
      condition: '',
      location: 'San Ramon, CA'
    });
    setSelectedImages([]);
    setImagePreviewUrls([]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.slice(0, 4 - selectedImages.length); // Limit to 4 total images
    
    if (newFiles.length > 0) {
      setSelectedImages(prev => [...prev, ...newFiles]);
      
      // Create preview URLs
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviewUrls(prev => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className={`${getFontSizeClass()} text-lg font-semibold text-gray-800 mb-4`}>Contribute Your Clothes</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload */}
          <div>
            <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Photos *</label>
            
            {/* Image Previews */}
            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            {selectedImages.length < 4 && (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Plus size={24} className="text-gray-400" />
                    </div>
                    <p className={`${getFontSizeClass()} text-gray-600 mb-1`}>
                      Add Photos ({selectedImages.length}/4)
                    </p>
                    <p className="text-xs text-gray-500">
                      Tap to select up to 4 photos
                    </p>
                  </div>
                </label>
              </div>
            )}

            {selectedImages.length === 4 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className={`${getFontSizeClass()} text-green-700 text-center`}>
                  ✓ Maximum photos added (4/4)
                </p>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Item Title *</label>
            <input
              type="text"
              placeholder="e.g., Vintage Denim Jacket"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${getFontSizeClass()}`}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Description</label>
            <textarea
              placeholder="Describe the item, its condition, and any special details..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${getFontSizeClass()}`}
            />
          </div>

          {/* Size and Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Size *</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${getFontSizeClass()}`}
                required
              >
                <option value="">Select Size</option>
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Color *</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${getFontSizeClass()}`}
                required
              >
                <option value="">Select Color</option>
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Style and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Style *</label>
              <select
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${getFontSizeClass()}`}
                required
              >
                <option value="">Select Style</option>
                {styles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${getFontSizeClass()}`}
                required
              >
                <option value="">Select Type</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Condition *</label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${getFontSizeClass()}`}
              required
            >
              <option value="">Select Condition</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className={`block ${getFontSizeClass()} font-medium text-gray-700 mb-2`}>Pickup Location</label>
            <div className="relative">
              <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 ${getFontSizeClass()}`}
                readOnly
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Location is set to San Ramon, CA</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={selectedImages.length === 0}
            className={`w-full bg-[#bad3de] text-[#132c0b] py-4 rounded-xl font-medium hover:bg-[#a8c8d4] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${getFontSizeClass()}`}
          >
            <Camera size={20} />
            <span>Contribute Item for Free</span>
          </button>
          
          {selectedImages.length === 0 && (
            <p className="text-xs text-red-500 text-center">
              Please add at least one photo to continue
            </p>
          )}
        </form>

        {/* Info Note */}
        <div className="mt-4 p-4 bg-green-50 rounded-xl">
          <p className={`${getFontSizeClass()} text-green-700`}>
            🌱 <strong>Remember:</strong> All items on UpThrift are contributed for free! 
            You're helping reduce waste and building community connections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributeTab;