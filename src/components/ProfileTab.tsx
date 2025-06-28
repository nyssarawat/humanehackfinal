import { useState } from 'react';
import { Edit3, MapPin, Star, Gift, Settings, Camera } from 'lucide-react';

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
      itemsContributed: 23,
      itemsCollected: 15,
      rating: 4.9
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const recentActivity = [
    { type: 'contributed', item: 'Vintage Denim Jacket', date: '2 days ago' },
    { type: 'collected', item: 'Cozy Sweater', date: '1 week ago' },
    { type: 'contributed', item: 'Summer Dress', date: '2 weeks ago' },
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
            <button className="absolute bottom-0 right-0 p-2 bg-[#bad3de] text-[#132c0b] rounded-full shadow-lg hover:bg-[#a8c8d4] transition-colors">
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
            className="flex items-center space-x-2 px-4 py-2 bg-[#bad3de] text-[#132c0b] rounded-xl hover:bg-[#a8c8d4] transition-colors"
          >
            <Edit3 size={16} />
            <span className={`${getFontSizeClass()} font-medium`}>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{user.stats.itemsContributed}</div>
          <div className={`${getFontSizeClass()} text-gray-600`}>Items Contributed</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{user.stats.itemsCollected}</div>
          <div className={`${getFontSizeClass()} text-gray-600`}>Items Collected</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <div className="text-2xl font-bold text-yellow-600">{user.stats.rating}</div>
          </div>
          <div className={`${getFontSizeClass()} text-gray-600`}>Rating</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
        <h3 className={`${getFontSizeClass()} text-lg font-semibold text-gray-800 mb-3`}>Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                activity.type === 'contributed' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <Gift size={16} className={
                  activity.type === 'contributed' ? 'text-green-600' : 'text-blue-600'
                } />
              </div>
              <div className="flex-1">
                <p className={`${getFontSizeClass()} font-medium text-gray-800`}>
                  {activity.type === 'contributed' ? 'Contributed' : 'Collected'}: {activity.item}
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