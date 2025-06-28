import { useState } from 'react';
import { Heart, Filter, ChevronLeft, ChevronRight, MapPin, Eye } from 'lucide-react';
import ListingModal from './ListingModal';
import FiltersModal from './FiltersModal';

interface FeedTabProps {
  fontSize?: string;
  onNavigateToChat?: (listing: any, contributorName: string) => void;
}

const FeedTab = ({ fontSize = 'sm', onNavigateToChat }: FeedTabProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [filters, setFilters] = useState({
    style: '',
    color: '',
    type: '',
    radius: 25,
    showFavoritesOnly: false
  });

  // Mock data for clothing listings with contributor information
  const mockListings = Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    title: ['Vintage Denim Jacket', 'Cozy Sweater', 'Summer Dress', 'Designer Jeans', 'Leather Boots'][i % 5],
    image: `https://images.unsplash.com/photo-${1649972904349 + i}-6e44c42644a7?w=400&h=400&fit=crop`,
    location: ['Brooklyn, NY', 'Manhattan, NY', 'Queens, NY', 'Bronx, NY'][i % 4],
    size: ['S', 'M', 'L', 'XL'][i % 4],
    style: ['Casual', 'Formal', 'Vintage', 'Trendy'][i % 4],
    color: ['Blue', 'Black', 'White', 'Red', 'Green'][i % 5],
    type: ['Jacket', 'Sweater', 'Dress', 'Jeans', 'Shoes'][i % 5],
    distance: Math.floor(Math.random() * 50) + 1,
    contributor: {
      name: ['Sarah Johnson', 'Mike Chen', 'Emma Davis', 'Alex Rodriguez', 'Jamie Kim'][i % 5],
      avatar: `https://images.unsplash.com/photo-${1507003211169 + i}-a54c709c8d2e?w=100&h=100&fit=crop&crop=face`,
      rating: 4.5 + (Math.random() * 0.5),
      totalDonations: Math.floor(Math.random() * 50) + 5
    }
  }));

  const itemsPerPage = 16;
  
  // Filter listings based on active filters
  const filteredListings = mockListings.filter(listing => {
    if (filters.showFavoritesOnly && !bookmarkedItems.has(listing.id)) {
      return false;
    }
    if (filters.radius && listing.distance > filters.radius) {
      return false;
    }
    if (filters.style && listing.style !== filters.style) {
      return false;
    }
    if (filters.color && listing.color !== filters.color) {
      return false;
    }
    if (filters.type && listing.type !== filters.type) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);

  const toggleBookmark = (id) => {
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarkedItems(newBookmarks);
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
    <div className="h-full flex flex-col p-4">
      {/* Filters Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`${getFontSizeClass()} font-semibold text-gray-800`}>Available Items</h2>
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-sm border border-[#36723f] border-opacity-30 hover:bg-[#36723f] hover:bg-opacity-5 transition-colors"
        >
          <Filter size={16} className="text-[#36723f]" />
          <span className={`${getFontSizeClass()} text-[#36723f]`}>Filters</span>
        </button>
      </div>

      {/* Active Filters Display */}
      {(filters.style || filters.color || filters.type || filters.showFavoritesOnly) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.showFavoritesOnly && (
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
              ❤️ Favorites Only
            </span>
          )}
          {filters.style && (
            <span className="bg-[#36723f] bg-opacity-10 text-[#36723f] px-2 py-1 rounded-full text-xs">
              {filters.style}
            </span>
          )}
          {filters.color && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              {filters.color}
            </span>
          )}
          {filters.type && (
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
              {filters.type}
            </span>
          )}
        </div>
      )}

      {/* Listings Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 pb-4">
          {currentListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-40 object-cover cursor-pointer"
                  onClick={() => setSelectedListing(listing)}
                />
                <button
                  onClick={() => toggleBookmark(listing.id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
                >
                  <Heart
                    size={16}
                    className={bookmarkedItems.has(listing.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600 hover:text-red-500'
                    }
                  />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <MapPin size={10} />
                  <span>{listing.distance}mi</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className={`${getFontSizeClass()} font-medium text-gray-800 mb-1 truncate`}>{listing.title}</h3>
                <p className={`${getFontSizeClass()} text-gray-500 mb-2`}>{listing.location}</p>
                <div className="flex justify-between items-center">
                  <span className={`bg-[#36723f] bg-opacity-10 text-[#36723f] px-2 py-1 rounded-full ${getFontSizeClass()}`}>
                    Size {listing.size}
                  </span>
                  <button
                    onClick={() => setSelectedListing(listing)}
                    className="p-1 hover:bg-[#36723f] hover:bg-opacity-5 rounded-full transition-colors"
                  >
                    <Eye size={14} className="text-[#36723f]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center space-x-1 px-4 py-2 bg-white rounded-full shadow-sm border border-[#36723f] border-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#36723f] hover:bg-opacity-5 transition-colors"
        >
          <ChevronLeft size={16} />
          <span className="text-sm">Back</span>
        </button>
        
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1 px-4 py-2 bg-white rounded-full shadow-sm border border-[#36723f] border-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#36723f] hover:bg-opacity-5 transition-colors"
        >
          <span className="text-sm">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Modals */}
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          isBookmarked={bookmarkedItems.has(selectedListing.id)}
          onToggleBookmark={() => toggleBookmark(selectedListing.id)}
          fontSize={fontSize}
          onNavigateToChat={onNavigateToChat}
        />
      )}

      {showFilters && (
        <FiltersModal
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default FeedTab;
