import { useState } from 'react';
import { Heart, MessageCircle, User, Plus, HelpCircle, Settings } from 'lucide-react';
import FeedTab from '../components/FeedTab';
import ChatTab from '../components/ChatTab';
import ProfileTab from '../components/ProfileTab';
import SellTab from '../components/SellTab';
import SupportTab from '../components/SupportTab';
import SettingsTab from '../components/SettingsTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [fontSize, setFontSize] = useState('sm');
  const [chatContext, setChatContext] = useState(null);

  const tabs = [
    { id: 'feed', icon: Heart, label: 'Feed', component: FeedTab },
    { id: 'chat', icon: MessageCircle, label: 'Chat', component: ChatTab },
    { id: 'sell', icon: Plus, label: 'Sell', component: SellTab },
    { id: 'profile', icon: User, label: 'Profile', component: ProfileTab },
    { id: 'support', icon: HelpCircle, label: 'Support', component: SupportTab },
    { id: 'settings', icon: Settings, label: 'Settings', component: SettingsTab },
  ];

  const handleNavigateToChat = (listing, contributorName) => {
    setChatContext({ listing, contributorName });
    setActiveTab('chat');
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || FeedTab;

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto pb-20" style={{ fontFamily: 'Verdana, sans-serif' }}>
      {/* Header */}
      <header className="bg-white shadow-sm p-4 rounded-b-2xl">
        <h1 className="text-2xl font-bold text-[#36723f] text-center">UpThrift</h1>
        <p className="text-sm text-[#36723f] text-center mt-1">Share clothes, spread love</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'settings' ? (
          <SettingsTab fontSize={fontSize} onFontSizeChange={setFontSize} />
        ) : activeTab === 'feed' ? (
          <FeedTab fontSize={fontSize} onNavigateToChat={handleNavigateToChat} />
        ) : activeTab === 'chat' ? (
          <ChatTab fontSize={fontSize} chatContext={chatContext} />
        ) : (
          <ActiveComponent fontSize={fontSize} />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 rounded-t-2xl shadow-lg max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#36723f] bg-opacity-10 text-[#36723f] scale-105' 
                    : 'text-gray-500 hover:text-[#36723f] hover:bg-[#36723f] hover:bg-opacity-5'
                }`}
              >
                <Icon size={18} className={isActive ? 'stroke-2' : 'stroke-1.5'} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Index;