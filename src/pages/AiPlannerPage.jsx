import React, { useState } from 'react';
import { Layout, Input, Button, Card, Typography, Space, Spin, Timeline, Tag, Divider, message } from 'antd';
import { ArrowLeftOutlined, RobotOutlined, CompassOutlined, CarOutlined, HomeOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchRealPlaces } from '../services/api';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const AiPlannerPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const generateItinerary = async () => {
    if (!prompt.trim()) {
      message.error("Please enter a destination or trip details first!");
      return;
    }
    
    setIsGenerating(true);
    setItinerary(null);

    try {
      const lowerPrompt = prompt.toLowerCase();
      
      // 1. Extract number of days (default to 3)
    const dayMatch = lowerPrompt.match(/(\d+)\s*day/);
    const numDays = dayMatch ? parseInt(dayMatch[1], 10) : 3;

    // 2. Extract destination (simple heuristic)
    let destination = "your destination";
    const destMatch = lowerPrompt.match(/(?:to|visit|in)\s+([a-z]+)/);
    if (destMatch && destMatch[1] && !['a', 'the', 'some', 'my', 'any'].includes(destMatch[1])) {
      destination = destMatch[1].charAt(0).toUpperCase() + destMatch[1].slice(1);
    }
    
    if (lowerPrompt.includes('goa')) destination = "Goa";
    if (lowerPrompt.includes('manali')) destination = "Manali";
    if (lowerPrompt.includes('dubai')) destination = "Dubai";
    if (lowerPrompt.includes('bali')) destination = "Bali";
    if (lowerPrompt.includes('paris')) destination = "Paris";

    // Prepare arrays for live data
    let liveHotels = [];
    let liveRestaurants = [];
    let liveAttractions = [];

    // Attempt to fetch real API data if a key is present
    if (import.meta.env.VITE_GOOGLE_PLACES_API_KEY) {
      try {
        const hotelType = lowerPrompt.includes('budget') ? 'budget hotels' : 'best hotels';
        liveHotels = await fetchRealPlaces(`${hotelType} in ${destination}`);
        liveRestaurants = await fetchRealPlaces(`best restaurants in ${destination}`);
        liveAttractions = await fetchRealPlaces(`top tourist attractions in ${destination}`);
      } catch (err) {
        console.error("Failed to fetch live data:", err);
        message.warning(`API Key Error: ${err.message}. Falling back to dynamic mock data.`);
      }
    } else {
      // Simulate delay for mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.info("Using simulated data. Add your API key to .env for live results!");
    }

    // 3. Prepare generic dynamic activities
    const morningActivities = liveAttractions.length > 0 
      ? liveAttractions.map(attr => `Visit ${attr.name} (⭐ ${attr.rating}) - ${attr.address}`)
      : [
        "Explore the historical center and main square", 
        "Visit the famous nearby nature reserve", 
        "Take a walking tour of the cultural downtown", 
        "Check out the local art museums and galleries"
      ];
    
    const afternoonActivities = liveRestaurants.length > 0
      ? liveRestaurants.map(rest => `Have a delicious lunch at ${rest.name} (⭐ ${rest.rating}) and explore nearby.`)
      : [
        "Have lunch at a highly-rated local restaurant and visit nearby markets", 
        "Enjoy outdoor activities or visit popular nearby landmarks", 
        "Visit the ancient temples, monuments, or historical sites nearby"
      ];
    
    const eveningActivities = [
      "Experience the vibrant nightlife and local street food scene", 
      "Enjoy a quiet sunset dinner overlooking the city or nature", 
      "Attend a local cultural show, music event, or performance", 
      "Take an evening stroll through the illuminated streets"
    ];

    // Generate dynamic day-by-day plan up to the requested days
    const generatedDays = [];
    for (let i = 1; i <= Math.min(numDays, 30); i++) {
      const m = morningActivities[i % morningActivities.length];
      const a = afternoonActivities[i % afternoonActivities.length];
      const e = eveningActivities[i % eveningActivities.length];
      
      generatedDays.push({
        day: `Day ${i}`,
        details: `Morning: ${m}. \n\nAfternoon: ${a}. \n\nEvening: ${e}.`
      });
    }

    // Prepare accommodation string
    let accommodationStr = "";
    if (liveHotels.length > 0) {
      accommodationStr = `Top live recommendations:\n` + liveHotels.map(h => `- ${h.name} (⭐ ${h.rating})`).join('\n');
    } else {
      accommodationStr = lowerPrompt.includes('budget') || lowerPrompt.includes('cheap')
        ? `Stay in a top-rated backpacker hostel or budget guesthouse near the center of ${destination} to save money.`
        : `Book a 4-star boutique hotel or resort in ${destination} for a comfortable stay close to major attractions.`;
    }

    // 4. Create the dynamic mock result
    const mockResult = {
      title: `Your ${numDays}-Day Trip to ${destination}`,
      transportation: `Fly or take a train to the main transport hub in ${destination}. For local travel, renting a vehicle or using public transport like buses and cabs is recommended to easily reach nearby places.`,
      accommodation: accommodationStr,
      days: generatedDays
    };

      setItinerary(mockResult);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      message.error("An error occurred while generating the itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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
        <Title level={4} style={{ margin: 0 }}>AI Trip Planner</Title>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <RobotOutlined style={{ fontSize: 48, color: 'var(--accent)', marginBottom: 16 }} />
          <Title level={2}>Plan Your Dream Trip with AI</Title>
          <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
            Powered by smart algorithms just like Gemini and ChatGPT. Tell us where you want to go, your budget, and how many days you have.
          </Paragraph>
        </div>

        <Card style={{ borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.04)', marginBottom: 32 }}>
          <TextArea 
            rows={4} 
            placeholder="e.g., Plan a 3-day budget trip to Goa. I love beaches and history." 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ borderRadius: 12, marginBottom: 16, fontSize: '1.05rem', padding: 16 }}
          />
          <Button 
            type="primary" 
            size="large" 
            block 
            icon={<CompassOutlined />}
            onClick={generateItinerary}
            loading={isGenerating}
            style={{ height: 50, borderRadius: 12, background: 'linear-gradient(90deg, var(--accent), #2fb58a)', fontSize: '1.1rem' }}
          >
            {isGenerating ? 'Generating Your Itinerary...' : 'Generate AI Itinerary'}
          </Button>
        </Card>

        {isGenerating && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: 16, color: 'var(--muted)' }}>Analyzing destinations, finding best routes, and building your schedule...</Paragraph>
          </div>
        )}

        {itinerary && !isGenerating && (
          <Card style={{ borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
            <Title level={3} style={{ color: 'var(--accent)', marginBottom: 24 }}>{itinerary.title}</Title>
            
            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
              <Col xs={24} md={12}>
                <Card type="inner" title={<><CarOutlined /> How to Travel</>} style={{ height: '100%', borderRadius: 12 }}>
                  <Text>{itinerary.transportation}</Text>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card type="inner" title={<><HomeOutlined /> Where to Stay</>} style={{ height: '100%', borderRadius: 12 }}>
                  <Text style={{ whiteSpace: 'pre-line' }}>{itinerary.accommodation}</Text>
                </Card>
              </Col>
            </Row>

            <Divider>Day-by-Day Plan</Divider>

            <Timeline style={{ marginTop: 24 }}>
              {itinerary.days.map((dayObj, index) => (
                <Timeline.Item color="var(--accent)" key={index}>
                  <Title level={5} style={{ margin: 0 }}>{dayObj.day}</Title>
                  <Paragraph type="secondary" style={{ marginTop: 8, whiteSpace: 'pre-line' }}>{dayObj.details}</Paragraph>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        )}
      </Content>
    </Layout>
  );
};

export default AiPlannerPage;
