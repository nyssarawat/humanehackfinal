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

  // Mock data for clothing listings with contributor information and proper images
  const mockListings = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      style: 'Vintage',
      color: 'Blue',
      type: 'Jacket',
      distance: 2,
      contributor: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 23
      }
    },
    {
      id: 2,
      title: 'Cozy Knit Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Casual',
      color: 'White',
      type: 'Sweater',
      distance: 5,
      contributor: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 15
      }
    },
    {
      id: 3,
      title: 'Floral Summer Dress',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Casual',
      color: 'Red',
      type: 'Dress',
      distance: 8,
      contributor: {
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 31
      }
    },
    {
      id: 4,
      title: 'Designer Jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Trendy',
      color: 'Blue',
      type: 'Jeans',
      distance: 12,
      contributor: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 18
      }
    },
    {
      id: 5,
      title: 'Leather Ankle Boots',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Formal',
      color: 'Black',
      type: 'Shoes',
      distance: 3,
      contributor: {
        name: 'Jamie Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 12
      }
    },
    {
      id: 6,
      title: 'Silk Blouse',
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Formal',
      color: 'White',
      type: 'Shirt',
      distance: 6,
      contributor: {
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 27
      }
    },
    {
      id: 7,
      title: 'Wool Coat',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Formal',
      color: 'Black',
      type: 'Jacket',
      distance: 9,
      contributor: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 20
      }
    },
    {
      id: 8,
      title: 'Bohemian Skirt',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Bohemian',
      color: 'Purple',
      type: 'Skirt',
      distance: 4,
      contributor: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 16
      }
    },
    {
      id: 9,
      title: 'Athletic Shorts',
      image: 'https://images.unsplash.com/photo-1506629905607-c60f40813d0d?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Sporty',
      color: 'Gray',
      type: 'Shorts',
      distance: 11,
      contributor: {
        name: 'Tom Brown',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 9
      }
    },
    {
      id: 10,
      title: 'Vintage Band T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Vintage',
      color: 'Black',
      type: 'Shirt',
      distance: 7,
      contributor: {
        name: 'Chris Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 35
      }
    },
    {
      id: 11,
      title: 'Formal Blazer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      style: 'Formal',
      color: 'Black',
      type: 'Jacket',
      distance: 5,
      contributor: {
        name: 'Rachel Green',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 22
      }
    },
    {
      id: 12,
      title: 'Casual Chinos',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'L',
      style: 'Casual',
      color: 'Brown',
      type: 'Pants',
      distance: 10,
      contributor: {
        name: 'Kevin Zhang',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 14
      }
    },
    {
      id: 13,
      title: 'Statement Necklace',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Green',
      type: 'Accessories',
      distance: 8,
      contributor: {
        name: 'Sophie Turner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 19
      }
    },
    {
      id: 14,
      title: 'Running Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Sporty',
      color: 'White',
      type: 'Shoes',
      distance: 13,
      contributor: {
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 25
      }
    },
    {
      id: 15,
      title: 'Maxi Dress',
      image: 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Bohemian',
      color: 'Yellow',
      type: 'Dress',
      distance: 6,
      contributor: {
        name: 'Anna Williams',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 33
      }
    },
    {
      id: 16,
      title: 'Cardigan Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Casual',
      color: 'Pink',
      type: 'Sweater',
      distance: 9,
      contributor: {
        name: 'Jennifer Lopez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 28
      }
    }
  ];

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
    // Don't change any visual state - just add to favorites silently
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
                    className="text-gray-600 hover:text-red-500"
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