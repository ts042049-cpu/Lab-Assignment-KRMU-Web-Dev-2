import React from 'react';
import { Input, Row, Col, Card, Button, Typography } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ASSETS } from '../constants/assets';
import BottomNav from '../components/BottomNav';

const { Title, Text, Paragraph } = Typography;

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 }
  }
};

const floatVariants1 = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 2, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

const floatVariants2 = {
  animate: {
    y: [0, 10, 0],
    rotate: [0, -2, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
  }
};

const floatVariants3 = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 3, 0],
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
  }
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'linear-gradient(180deg, #fff 0%, #fff8e6 100%)', minHeight: '100vh', paddingBottom: 80, overflowX: 'hidden' }}>
      <motion.div 
        className="container" 
        style={{ paddingTop: 16 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Topbar */}
        <motion.header variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(180deg, var(--accent), #0d8ca3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(11,114,133,0.3)', cursor: 'pointer' }}
            >
              JT
            </motion.div>
            <div>
              <Text strong style={{ display: 'block', fontSize: 15 }}>Journey</Text>
              <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>Together</Text>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button type="text" shape="circle" icon={<BellOutlined style={{ fontSize: 20 }} />} />
          </motion.div>
        </motion.header>

        {/* Hero Section */}
        <motion.div 
          variants={itemVariants}
          style={{ display: 'flex', gap: 18, alignItems: 'center', background: 'linear-gradient(135deg, #ffffff, #fdfbf5)', borderRadius: 24, padding: '32px 24px', boxShadow: '0 12px 40px rgba(15,23,36,0.08)', marginBottom: 32, flexWrap: 'wrap', border: '1px solid rgba(255,255,255,0.8)' }}
        >
          <div style={{ flex: '1 1 300px' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              <Title level={1} style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
                Find <span style={{ background: 'linear-gradient(90deg, var(--accent), #1de9b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>your</span> Travel Buddies
              </Title>
              <Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 24, fontSize: '1.1rem', maxWidth: '90%' }}>
                Connect with like-minded travelers, plan smart itineraries, and share unforgettable global journeys.
              </Paragraph>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Input.Search 
                  placeholder="Search buddies, trips or destinations" 
                  allowClear 
                  enterButton={<Button type="primary" size="large" icon={<SearchOutlined />} style={{ background: 'var(--accent)', borderColor: 'var(--accent)' }} />}
                  size="large"
                  style={{ maxWidth: 400, boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderRadius: 8 }}
                />
              </motion.div>
            </motion.div>
          </div>

          <div style={{ flex: '1 1 300px', display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <motion.img variants={floatVariants1} animate="animate" src={ASSETS.homeCollage1} alt="collage" style={{ width: '30%', borderRadius: 16, objectFit: 'cover', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
            <motion.img variants={floatVariants2} animate="animate" src={ASSETS.homeCollage2} alt="collage" style={{ width: '33%', borderRadius: 16, objectFit: 'cover', boxShadow: '0 15px 30px rgba(0,0,0,0.15)', zIndex: 2 }} />
            <motion.img variants={floatVariants3} animate="animate" src={ASSETS.homeCollage3} alt="collage" style={{ width: '30%', borderRadius: 16, objectFit: 'cover', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
          </div>
        </motion.div>

        {/* Dynamic Cards Grid */}
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12}>
            <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card hoverable cover={<img alt="buddies" src={ASSETS.buddiesCard} style={{ height: 180, objectFit: 'cover' }} />} style={{ borderRadius: 20, overflow: 'hidden', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }} bodyStyle={{ padding: 20 }}>
                <Title level={4} style={{ marginTop: 0, marginBottom: 8, fontWeight: 700 }}>Find Buddies</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>Meet travelers with shared interests around the globe and make memories.</Text>
                <Button type="primary" size="large" ghost style={{ borderRadius: 10, width: '100%', fontWeight: 600 }} onClick={() => navigate('/buddies')}>Find your perfect match</Button>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12}>
            <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card hoverable cover={<img alt="chat" src={ASSETS.chatCard} style={{ height: 180, objectFit: 'cover' }} />} style={{ borderRadius: 20, overflow: 'hidden', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }} bodyStyle={{ padding: 20 }}>
                <Title level={4} style={{ marginTop: 0, marginBottom: 8, fontWeight: 700 }}>Hook Up (Chat)</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>Start conversations seamlessly — because your vibe attracts your tribe.</Text>
                <Button type="primary" size="large" ghost style={{ borderRadius: 10, width: '100%', fontWeight: 600 }} onClick={() => navigate('/chat')}>Chat with buddies</Button>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12}>
            <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card hoverable cover={<img alt="booking" src={ASSETS.flightCard} style={{ height: 180, objectFit: 'cover' }} />} style={{ borderRadius: 20, overflow: 'hidden', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }} bodyStyle={{ padding: 20 }}>
                <Title level={4} style={{ marginTop: 0, marginBottom: 8, fontWeight: 700 }}>Booking</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>Secure flights, luxury hotels, quick cabs & amenities easily.</Text>
                <Button type="primary" size="large" ghost style={{ borderRadius: 10, width: '100%', fontWeight: 600 }} onClick={() => window.open('https://www.makemytrip.com', '_blank')}>Go to MakeMyTrip</Button>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12}>
            <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card hoverable cover={<img alt="planner" src={ASSETS.plannerCard} style={{ height: 180, objectFit: 'cover' }} />} style={{ borderRadius: 20, overflow: 'hidden', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }} bodyStyle={{ padding: 20 }}>
                <Title level={4} style={{ marginTop: 0, marginBottom: 8, fontWeight: 700 }}>AI Planner</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>Custom, dynamic trips tailored perfectly to your taste via AI.</Text>
                <Button type="primary" size="large" ghost style={{ borderRadius: 10, width: '100%', fontWeight: 600 }} onClick={() => navigate('/planner')}>Plan my trip</Button>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
      
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 20, delay: 0.5 }}>
        <BottomNav />
      </motion.div>
    </div>
  );
};

export default HomePage;
