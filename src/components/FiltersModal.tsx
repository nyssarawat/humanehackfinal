import { X } from 'lucide-react';

interface FiltersModalProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

const FiltersModal = ({ filters, onFiltersChange, onClose }: FiltersModalProps) => {
  const styles = ['Casual', 'Formal', 'Vintage', 'Trendy', 'Sporty', 'Bohemian'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Pink', 'Brown', 'Gray'];
  const types = ['Jacket', 'Sweater', 'Dress', 'Jeans', 'Shoes', 'Shirt', 'Skirt', 'Shorts', 'Pants', 'Accessories'];

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: filters[key] === value ? '' : value
    });
  };

  const updateRadius = (value: number) => {
    onFiltersChange({
      ...filters,
      radius: value
    });
  };

  const toggleFavorites = () => {
    onFiltersChange({
      ...filters,
      showFavoritesOnly: !filters.showFavoritesOnly
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      style: '',
      color: '',
      type: '',
      radius: 25,
      showFavoritesOnly: false
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Favorites Filter */}
          <div>
            <button
              onClick={toggleFavorites}
              className={`w-full px-4 py-3 rounded-xl font-medium transition-colors ${
                filters.showFavoritesOnly
                  ? 'bg-red-600 text-white'
                  : 'bg-[#bad3de] text-[#132c0b] hover:bg-[#a8c8d4]'
              }`}
            >
              {filters.showFavoritesOnly ? '❤️ Showing Favorites Only' : '🤍 Show Favorites Only'}
            </button>
          </div>

          {/* Location Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Distance: {filters.radius} miles
            </label>
            <input
              type="range"
              min="1"
              max="25"
              value={filters.radius}
              onChange={(e) => updateRadius(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 mi</span>
              <span>25 mi</span>
            </div>
          </div>

          {/* Style Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Style</label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => updateFilter('style', style)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.style === style
                      ? 'bg-green-600 text-white'
                      : 'bg-[#bad3de] text-[#132c0b] hover:bg-[#a8c8d4]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateFilter('color', color)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.color === color
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#bad3de] text-[#132c0b] hover:bg-[#a8c8d4]'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Clothing Type</label>
            <div className="grid grid-cols-2 gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => updateFilter('type', type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.type === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#bad3de] text-[#132c0b] hover:bg-[#a8c8d4]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={clearAllFilters}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-[#bad3de] text-[#132c0b] rounded-xl font-medium hover:bg-[#a8c8d4] transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;