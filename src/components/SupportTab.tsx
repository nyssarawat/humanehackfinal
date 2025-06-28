import { useState } from 'react';
import { Send, Phone, Mail, MessageCircle, HelpCircle } from 'lucide-react';

const SupportTab = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your UpThrift assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      isBot: false,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(newMessage),
        isBot: true,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
      return "UpThrift is simple! Browse free clothing listings, message the contributor if interested, and arrange a pickup. You can also contribute your own items to share with the community.";
    } else if (lowerMessage.includes('contribute') || lowerMessage.includes('post')) {
      return "To contribute an item, go to the 'Contribute' tab, add photos, fill in the details, and submit. Remember, all items on UpThrift are contributed for free!";
    } else if (lowerMessage.includes('pickup') || lowerMessage.includes('meet')) {
      return "For safety, we recommend meeting in public places during daylight hours. Many users prefer coffee shops, libraries, or community centers for exchanges.";
    } else if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      return "Item sizing can vary by brand. We recommend messaging the contributor to ask about measurements or fit. Our virtual try-on feature is coming soon!";
    } else if (lowerMessage.includes('safe')) {
      return "Your safety is important! Always meet in public places, bring a friend if possible, and trust your instincts. Report any concerning behavior through our app.";
    } else {
      return "I'm here to help! You can ask me about how UpThrift works, contributing items, safety tips, or anything else. For complex issues, please contact our support team.";
    }
  };

  const faqItems = [
    {
      question: "How does UpThrift work?",
      answer: "Browse free clothing listings, message contributors, and arrange pickups!"
    },
    {
      question: "Is everything really free?",
      answer: "Yes! UpThrift is all about sharing clothes for free to reduce waste."
    },
    {
      question: "How do I arrange pickup?",
      answer: "Message the item contributor through our chat feature to coordinate."
    },
    {
      question: "What if an item doesn't fit?",
      answer: "You can always pass it along to someone else in the community!"
    }
  ];

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Support & Help</h2>
        <p className="text-sm text-gray-600">We're here to help you have the best experience!</p>
      </div>

      {/* Quick FAQ */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
        <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <HelpCircle size={20} className="text-blue-600" />
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
              <h4 className="text-sm font-medium text-gray-800 mb-1">{item.question}</h4>
              <p className="text-xs text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-md font-semibold text-gray-800 flex items-center space-x-2">
            <MessageCircle size={20} className="text-green-600" />
            <span>Chat with AI Assistant</span>
          </h3>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-green-600 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4">
        <h3 className="text-md font-semibold text-gray-800 mb-3">Need More Help?</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Phone size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Call Support</p>
              <p className="text-xs text-gray-600">1-800-UPTHRIFT</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Mail size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Email Support</p>
              <p className="text-xs text-gray-600">help@upthrift.com</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 text-center">
            Support hours: Monday-Friday 9AM-6PM EST
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportTab;