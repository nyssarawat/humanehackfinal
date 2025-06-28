import { useState, useEffect } from 'react';
import { Search, MessageCircle, Clock, ExternalLink } from 'lucide-react';

interface ChatTabProps {
  fontSize?: string;
  chatContext?: {
    listing: any;
    contributorName: string;
  } | null;
}

const ChatTab = ({ fontSize = 'sm', chatContext }: ChatTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  // Mock chat data with proper clothing images
  const mockChats = [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'Is the vintage jacket still available?',
      time: '2m ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      unread: true,
      item: 'Vintage Denim Jacket',
      itemImage: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Mike Chen',
      lastMessage: 'Thank you for the sweater! It fits perfectly.',
      time: '1h ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      unread: false,
      item: 'Cozy Knit Sweater',
      itemImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Emma Davis',
      lastMessage: 'When can I pick up the dress?',
      time: '3h ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      unread: true,
      item: 'Floral Summer Dress',
      itemImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Alex Rivera',
      lastMessage: 'Great! See you tomorrow at 3 PM.',
      time: '1d ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      unread: false,
      item: 'Designer Jeans',
      itemImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
    }
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

  // Auto-select chat when context is provided
  useEffect(() => {
    if (chatContext) {
      // Find or create a chat with the contributor
      const existingChat = mockChats.find(chat => chat.name === chatContext.contributorName);
      if (existingChat) {
        setSelectedChat({
          ...existingChat,
          contextListing: chatContext.listing
        });
      } else {
        // Create new chat context
        setSelectedChat({
          id: Date.now(),
          name: chatContext.contributorName,
          avatar: chatContext.listing.contributor.avatar,
          contextListing: chatContext.listing
        });
      }
    }
  }, [chatContext]);

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a specific chat is selected (from interest button), show chat interface
  if (selectedChat) {
    const listingLink = selectedChat.contextListing ? 
      `${window.location.origin}/#listing-${selectedChat.contextListing.id}` : '';

    return (
      <div className="h-full flex flex-col p-4">
        {/* Chat Header */}
        <div className="flex items-center space-x-3 mb-4 bg-white p-4 rounded-xl shadow-sm">
          <button 
            onClick={() => setSelectedChat(null)}
            className="text-[#36723f] hover:bg-[#36723f] hover:bg-opacity-5 p-2 rounded-full transition-colors"
          >
            ←
          </button>
          <img
            src={selectedChat.avatar}
            alt={selectedChat.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className={`${getFontSizeClass()} font-semibold text-gray-800`}>{selectedChat.name}</h3>
            <p className={`${getFontSizeClass()} text-[#36723f]`}>Contributor</p>
          </div>
        </div>

        {/* Listing Context (if available) */}
        {selectedChat.contextListing && (
          <div className="bg-[#36723f] bg-opacity-5 p-4 rounded-xl mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <ExternalLink size={16} className="text-[#36723f]" />
              <span className={`${getFontSizeClass()} font-medium text-[#36723f]`}>About this item:</span>
            </div>
            
            {/* Embedded Listing Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
              <div className="flex items-start space-x-3">
                <img
                  src={selectedChat.contextListing.image}
                  alt={selectedChat.contextListing.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className={`${getFontSizeClass()} font-semibold text-gray-800 mb-1`}>
                    {selectedChat.contextListing.title}
                  </h4>
                  <p className={`${getFontSizeClass()} text-gray-600 mb-2`}>
                    Size {selectedChat.contextListing.size} • {selectedChat.contextListing.location}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#36723f] bg-opacity-10 text-[#36723f] px-2 py-1 rounded-full text-xs">
                      {selectedChat.contextListing.style}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {selectedChat.contextListing.color}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Listing Link */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className={`${getFontSizeClass()} text-xs text-[#36723f] break-all`}>
                  🔗 {listingLink}
                </p>
              </div>
            </div>

            {/* Pre-filled Message */}
            <div className="bg-white rounded-xl p-3 border-l-4 border-[#36723f]">
              <p className={`${getFontSizeClass()} text-gray-700`}>
                Hi! I'm interested in your {selectedChat.contextListing?.title}.
              </p>
            </div>
          </div>
        )}

        {/* Chat Interface Placeholder */}
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm flex items-center justify-center">
          <div className="text-center">
            <MessageCircle size={48} className="text-[#36723f] mx-auto mb-4" />
            <p className={`${getFontSizeClass()} text-[#36723f] font-medium`}>
              Chat interface will be implemented here
            </p>
            <p className={`${getFontSizeClass()} text-gray-600 mt-2`}>
              Your message is ready to send to {selectedChat.name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className={`${getFontSizeClass()} font-semibold text-gray-800 mb-3`}>Messages</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#36723f] focus:border-transparent"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.unread && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#36723f] rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`${getFontSizeClass()} font-medium truncate ${chat.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                      {chat.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                  </div>
                  
                  <p className={`${getFontSizeClass()} text-[#36723f] mb-1 font-medium`}>
                    About: {chat.item}
                  </p>
                  
                  <p className={`${getFontSizeClass()} truncate ${chat.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageCircle size={48} className="text-gray-300 mb-4" />
            <h3 className={`${getFontSizeClass()} font-medium text-gray-500 mb-2`}>No conversations found</h3>
            <p className={`${getFontSizeClass()} text-gray-400`}>
              {searchTerm ? 'Try adjusting your search terms' : 'Start chatting about items you\'re interested in!'}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-xl">
        <p className={`${getFontSizeClass()} text-blue-700 text-center`}>
          💬 Chat directly with contributors to ask questions and arrange pickups
        </p>
      </div>
    </div>
  );
};

export default ChatTab;