import { X, Heart, MapPin, Palette, Shirt, Eye, MessageCircle, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface ListingModalProps {
  listing: any;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  fontSize?: string;
  onNavigateToChat?: (listing: any, contributorName: string) => void;
}

const ListingModal = ({ listing, onClose, isBookmarked, onToggleBookmark, fontSize = 'sm', onNavigateToChat }: ListingModalProps) => {
  const handleInterest = () => {
    if (onNavigateToChat) {
      // Navigate to chat with the contributor and pass the listing context
      onNavigateToChat(listing, listing.contributor.name);
      onClose(); // Close the modal after navigating
    } else {
      // Fallback behavior if onNavigateToChat is not provided
      const listingLink = `${window.location.origin}/#listing-${listing.id}`;
      const message = `Hi! I'm interested in your ${listing.title}. Here's the listing: ${listingLink}`;
      alert(`Opening chat with ${listing.contributor.name}...\nMessage: ${message}`);
    }
  };

  const handleVirtualTryOn = () => {
    // Placeholder for virtual try-on feature
    alert('Virtual try-on feature coming soon!');
  };

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
          <button
            onClick={onToggleBookmark}
            className="absolute top-4 left-4 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <Heart
              size={20}
              className={isBookmarked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className={`${getFontSizeClass()} font-bold text-gray-800 mb-2`}>{listing.title}</h2>
          
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
            <MapPin size={16} />
            <span className={getFontSizeClass()}>{listing.location} • {listing.distance} miles away</span>
          </div>

          {/* Contributor Information */}
          <div className="bg-[#36723f] bg-opacity-5 p-4 rounded-xl mb-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={listing.contributor.avatar} alt={listing.contributor.name} />
                <AvatarFallback>{listing.contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className={`${getFontSizeClass()} font-semibold text-gray-800`}>{listing.contributor.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className={`${getFontSizeClass()} text-gray-600`}>{listing.contributor.rating.toFixed(1)}</span>
                  </div>
                  <span className={`${getFontSizeClass()} text-gray-500`}>•</span>
                  <span className={`${getFontSizeClass()} text-gray-600`}>{listing.contributor.totalDonations} donations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center space-x-2 mb-1">
                <Shirt size={16} className="text-[#36723f]" />
                <span className={`${getFontSizeClass()} font-medium text-gray-500`}>SIZE</span>
              </div>
              <span className={`${getFontSizeClass()} font-semibold`}>{listing.size}</span>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center space-x-2 mb-1">
                <Palette size={16} className="text-blue-600" />
                <span className={`${getFontSizeClass()} font-medium text-gray-500`}>COLOR</span>
              </div>
              <span className={`${getFontSizeClass()} font-semibold`}>{listing.color}</span>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`${getFontSizeClass()} font-medium text-gray-500`}>STYLE</span>
              </div>
              <span className={`${getFontSizeClass()} font-semibold`}>{listing.style}</span>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`${getFontSizeClass()} font-medium text-gray-500`}>TYPE</span>
              </div>
              <span className={`${getFontSizeClass()} font-semibold`}>{listing.type}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleVirtualTryOn}
              className={`w-full flex items-center justify-center space-x-2 bg-purple-100 text-purple-700 py-3 rounded-xl font-medium hover:bg-purple-200 transition-colors ${getFontSizeClass()}`}
            >
              <Eye size={20} />
              <span>Virtual Try-On</span>
            </button>
            
            <button
              onClick={handleInterest}
              className={`w-full flex items-center justify-center space-x-2 bg-[#36723f] text-white py-3 rounded-xl font-medium hover:bg-[#36723f] hover:bg-opacity-90 transition-colors ${getFontSizeClass()}`}
            >
              <MessageCircle size={20} />
              <span>I'm Interested!</span>
            </button>

            <button
              onClick={onClose}
              className={`w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors ${getFontSizeClass()}`}
            >
              <X size={20} />
              <span>Exit</span>
            </button>
          </div>

          {/* Condition Note */}
          <div className="mt-4 p-4 bg-[#36723f] bg-opacity-5 rounded-xl">
            <p className={`${getFontSizeClass()} text-[#36723f]`}>
              <strong>Free to Good Home!</strong> This item is being given away for free. 
              Please only express interest if you genuinely need it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;