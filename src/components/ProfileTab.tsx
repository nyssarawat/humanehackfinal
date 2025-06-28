import { useState } from 'react';
import { Edit3, MapPin, Star, Gift, Settings, Camera, Heart, Eye } from 'lucide-react';

interface ProfileTabProps {
  fontSize?: string;
  favoriteItems?: Set<number>;
}

const ProfileTab = ({ fontSize = 'sm', favoriteItems = new Set() }: ProfileTabProps) => {
  const [user, setUser] = useState({
    name: 'Jessica Thompson',
    location: 'Brooklyn, NY',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    bio: 'Sustainable fashion lover sharing preloved clothes with the community! 🌱',
    stats: {
      itemsShared: 23,
      itemsReceived: 15,
      rating: 4.9
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  // All available listings (same as in FeedTab)
  const allListings = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      distance: 2,
      contributor: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 2,
      title: 'Cozy Knit Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      distance: 5,
      contributor: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 3,
      title: 'Floral Summer Dress',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      distance: 8,
      contributor: {
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 4,
      title: 'Designer Jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      distance: 12,
      contributor: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 5,
      title: 'Leather Ankle Boots',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      distance: 3,
      contributor: {
        name: 'Jamie Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 6,
      title: 'Silk Blouse',
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      distance: 6,
      contributor: {
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 7,
      title: 'Wool Coat',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      distance: 9,
      contributor: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 8,
      title: 'Bohemian Skirt',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      distance: 4,
      contributor: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 9,
      title: 'Athletic Shorts',
      image: 'https://images.unsplash.com/photo-1506629905607-c60f40813d0d?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      distance: 11,
      contributor: {
        name: 'Tom Brown',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 10,
      title: 'Vintage Band T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      distance: 7,
      contributor: {
        name: 'Chris Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 11,
      title: 'Formal Blazer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      distance: 5,
      contributor: {
        name: 'Rachel Green',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 12,
      title: 'Casual Chinos',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'L',
      distance: 10,
      contributor: {
        name: 'Kevin Zhang',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 13,
      title: 'Statement Necklace',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      distance: 8,
      contributor: {
        name: 'Sophie Turner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 14,
      title: 'Running Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      distance: 13,
      contributor: {
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 15,
      title: 'Maxi Dress',
      image: 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      distance: 6,
      contributor: {
        name: 'Anna Williams',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 16,
      title: 'Cardigan Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      distance: 9,
      contributor: {
        name: 'Jennifer Lopez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      }
    }
  ];

  // Filter listings to show only favorited items
  const favoriteListings = allListings.filter(listing => favoriteItems.has(listing.id));

  const recentActivity = [
    { type: 'shared', item: 'Vintage Denim Jacket', date: '2 days ago' },
    { type: 'received', item: 'Cozy Sweater', date: '1 week ago' },
    { type: 'shared', item: 'Summer Dress', date: '2 weeks ago' },
  ];

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
    <div className="h-full overflow-y-auto p-4">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          
          <h2 className={`${getFontSizeClass()} text-xl font-bold text-gray-800 mb-1`}>{user.name}</h2>
          
          <div className="flex items-center space-x-1 text-gray-600 mb-3">
            <MapPin size={16} />
            <span className={getFontSizeClass()}>{user.location}</span>
          </div>
          
          <p className={`${getFontSizeClass()} text-gray-600 text-center mb-4`}>{user.bio}</p>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
          >
            <Edit3 size={16} />
            <span className={`${getFontSizeClass()} font-medium`}>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{user.stats.itemsShared}</div>
          <div className={`${getFontSizeClass()} text-gray-600`}>Items Shared</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{user.stats.itemsReceived}</div>
          <div className={`${getFontSizeClass()} text-gray-600`}>Items Received</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <div className="text-2xl font-bold text-yellow-600">{user.stats.rating}</div>
          </div>
          <div className={`${getFontSizeClass()} text-gray-600`}>Rating</div>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Heart size={20} className="text-red-500 fill-red-500" />
          <h3 className={`${getFontSizeClass()} text-lg font-semibold text-gray-800`}>My Favorites</h3>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            {favoriteListings.length}
          </span>
        </div>
        
        {favoriteListings.length > 0 ? (
          <div className="space-y-3">
            {favoriteListings.map((listing) => (
              <div key={listing.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className={`${getFontSizeClass()} font-semibold text-gray-800 truncate`}>{listing.title}</h4>
                  <p className={`${getFontSizeClass()} text-gray-600 mb-1`}>{listing.location} • {listing.distance}mi away</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      Size {listing.size}
                    </span>
                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                      <Eye size={14} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Heart size={48} className="text-gray-300 mx-auto mb-3" />
            <p className={`${getFontSizeClass()} text-gray-500`}>No favorites yet</p>
            <p className={`${getFontSizeClass()} text-gray-400 mt-1`}>Heart items you love to save them here!</p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
        <h3 className={`${getFontSizeClass()} text-lg font-semibold text-gray-800 mb-3`}>Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                activity.type === 'shared' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <Gift size={16} className={
                  activity.type === 'shared' ? 'text-green-600' : 'text-blue-600'
                } />
              </div>
              <div className="flex-1">
                <p className={`${getFontSizeClass()} font-medium text-gray-800`}>
                  {activity.type === 'shared' ? 'Shared' : 'Received'}: {activity.item}
                </p>
                <p className={`${getFontSizeClass()} text-gray-500`}>{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className={`${getFontSizeClass()} text-lg font-semibold text-gray-800 mb-3`}>Settings</h3>
        <div className="space-y-2">
          {[
            'Account Settings',
            'Notification Preferences',
            'Privacy Settings',
            'Help & Support',
            'About UpThrift'
          ].map((setting, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <span className={`${getFontSizeClass()} text-gray-700`}>{setting}</span>
              <Settings size={16} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;