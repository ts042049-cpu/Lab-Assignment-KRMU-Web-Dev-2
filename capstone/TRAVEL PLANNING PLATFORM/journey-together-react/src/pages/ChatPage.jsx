import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Button, List, Avatar, Typography, Card, Spin } from 'antd';
import { SendOutlined, ArrowLeftOutlined, RobotOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'AI Travel Buddy',
      avatarIcon: <RobotOutlined />,
      text: 'Hello! I am your AI Travel Buddy. Tell me about the trip you want to plan or the kind of companion you are looking for!',
      isMine: false,
      isAi: true,
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Expanded knowledge base for better simulated training
  const knowledgeBase = [
    { keywords: ['hi', 'hello', 'hey', 'greetings'], response: "Hello! I'm your Journey Together AI Assistant. Where would you like to travel next?" },
    { keywords: ['goa', 'beach', 'ocean', 'sea', 'surf', 'maldives', 'bali'], response: "Beach trips are fantastic! I can help you find travel buddies interested in relaxing by the ocean, surfing, or suggest the best coastal resorts." },
    { keywords: ['manali', 'mountain', 'snow', 'trekking', 'hike', 'himalayas', 'alps'], response: "Mountains are beautiful! I can help you find hiking companions, suggest trekking gear, or plan an itinerary for high-altitude passes." },
    { keywords: ['flight', 'ticket', 'air', 'book', 'fly'], response: "I can assist you with flight bookings! Please tell me your departure city, destination, and preferred dates." },
    { keywords: ['budget', 'cheap', 'cost', 'money', 'affordable'], response: "Traveling on a budget? No problem. I can filter out expensive options and suggest backpacker hostels, cheap flights, and local street food guides." },
    { keywords: ['buddy', 'partner', 'companion', 'friend', 'match'], response: "Looking for a travel buddy? Our platform matches you based on your interests, age, and destination. Would you like me to start searching for matches?" },
    { keywords: ['plan', 'itinerary', 'schedule', 'days', 'guide'], response: "I can help create a custom day-by-day itinerary. How many days are you planning for your trip, and what is your destination?" },
    { keywords: ['dubai', 'uae', 'shopping', 'desert'], response: "Dubai is perfect for luxury, shopping, and desert safaris. Would you like me to find companions for a Dubai trip?" },
    { keywords: ['paris', 'france', 'europe', 'romantic', 'eiffel'], response: "Paris is wonderful! It's great for art, culture, and cuisine. Want me to pull up top attractions or find a buddy for a Euro-trip?" },
    { keywords: ['safety', 'secure', 'verified', 'safe'], response: "Safety is our top priority. All our users are verified, and you can read community reviews before matching with a travel buddy." }
  ];

  const getAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Find the best matching intent
    for (let item of knowledgeBase) {
      if (item.keywords.some(kw => lowerInput.includes(kw))) {
        return item.response;
      }
    }
    
    // Fallback response if no keywords match
    return "That's very interesting! As your AI Travel Buddy, I am still learning, but I can definitely help you find travel companions, book flights, and plan itineraries. Could you provide a few more specific details about your trip?";
  };

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userText = inputValue;
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      avatar: ASSETS.accountIcon,
      text: userText,
      isMine: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI ChatGPT-like response
    setTimeout(() => {
      const aiResponse = getAIResponse(userText);

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'AI Travel Buddy',
        avatarIcon: <RobotOutlined />,
        text: aiResponse,
        isMine: false,
        isAi: true,
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500); // 1.5 seconds typing delay
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f8f7' }}>
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/home')} 
          style={{ marginRight: 16 }}
        />
        <Title level={4} style={{ margin: 0 }}>AI Buddy Chat</Title>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 800, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">Chat with our AI Travel Buddy to plan your itinerary, get recommendations, and find matching companions.</Text>
        </div>

        <Card 
          style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
          bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}
        >
          {/* Chat Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#fafafa', minHeight: '60vh', maxHeight: '70vh' }}>
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(msg) => (
                <List.Item style={{ borderBottom: 'none', padding: '8px 0', justifyContent: msg.isMine ? 'flex-end' : 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: msg.isMine ? 'row-reverse' : 'row', gap: 12, maxWidth: '85%' }}>
                    {msg.isAi ? (
                       <Avatar style={{ backgroundColor: 'var(--accent)' }} icon={<RobotOutlined />} />
                    ) : (
                       <Avatar src={msg.avatar} />
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.isMine ? 'flex-end' : 'flex-start' }}>
                      <Text type="secondary" style={{ fontSize: 12, marginBottom: 4 }}>{msg.sender}</Text>
                      <div style={{ 
                        background: msg.isMine ? 'var(--accent)' : '#fff', 
                        color: msg.isMine ? '#fff' : '#000',
                        padding: '12px 18px', 
                        borderRadius: 18,
                        borderTopRightRadius: msg.isMine ? 4 : 18,
                        borderTopLeftRadius: msg.isMine ? 18 : 4,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        fontSize: '0.95rem'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <Avatar style={{ backgroundColor: 'var(--accent)' }} icon={<RobotOutlined />} />
                <div style={{ background: '#fff', padding: '12px 18px', borderRadius: 18, borderTopLeftRadius: 4, boxShadow: '0 2px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
                  <Spin size="small" />
                  <Text style={{ marginLeft: 10, fontSize: '0.95rem' }} type="secondary">AI Buddy is typing...</Text>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div style={{ padding: '16px 20px', background: '#fff', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 12 }}>
            <Input 
              size="large"
              placeholder="Ask the AI Buddy about your travel plans..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleSend}
              style={{ borderRadius: 24 }}
              disabled={isTyping}
            />
            <Button 
              type="primary" 
              size="large"
              shape="circle" 
              icon={<SendOutlined />} 
              onClick={handleSend}
              style={{ background: 'var(--accent)' }}
              disabled={isTyping}
            />
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default ChatPage;
