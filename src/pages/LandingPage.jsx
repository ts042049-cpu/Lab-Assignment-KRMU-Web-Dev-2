import React from 'react';
import { Button, Row, Col, Card, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const { Title, Paragraph, Text } = Typography;

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header className="site-header">
        <div className="container header-inner" style={{ justifyContent: 'space-between' }}>
          <Link to="/" className="logo-text">Journey Together</Link>
          <nav style={{ display: 'none', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
            <Link to="/home" className="muted-text">Home</Link>
            <a href="#how-it-works" className="muted-text">How It Works</a>
            <a href="#safety" className="muted-text">Safety</a>
            <Link to="/login" className="muted-text">Login</Link>
          </nav>
          <Space>
            <Link to="/login">
              <Button type="primary" shape="round" style={{ background: 'linear-gradient(90deg, var(--accent), #08b089)', boxShadow: '0 6px 18px rgba(14,164,137,0.18)' }}>
                Join the Journey
              </Button>
            </Link>
            <Link to="/profile">
              <img src={ASSETS.accountIcon} alt="account" style={{ height: 40, width: 40, borderRadius: '50%' }} />
            </Link>
          </Space>
        </div>
      </header>

      <main className="container" style={{ padding: '40px 0' }}>
        {/* Hero */}
        <Row gutter={[32, 32]} align="middle" style={{ marginBottom: 60 }}>
          <Col xs={24} md={12}>
            <Title level={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
              <span style={{ color: 'var(--accent)' }}>Connect</span> with Like-Minded Travelers & Embark on Unforgettable Journeys.
            </Title>
            <Paragraph style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: 24 }}>
              The smartest way to find compatible travel companions based on destination, budget, and personality.
            </Paragraph>
            <Link to="/login">
              <Button type="primary" size="large" shape="round" style={{ padding: '0 32px' }}>
                Find Your Travel Buddy
              </Button>
            </Link>
          </Col>
          <Col xs={24} md={12}>
            <img src={ASSETS.heroMap} alt="couple with map" style={{ width: '100%', borderRadius: 18, boxShadow: 'var(--shadow)', maxHeight: 400, objectFit: 'cover' }} />
          </Col>
        </Row>

        {/* Steps */}
        <div id="how-it-works" style={{ background: '#fff', padding: '40px', borderRadius: 16, boxShadow: 'var(--shadow)', marginBottom: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={2}>Your Journey Starts Here</Title>
            <Text type="secondary">Simple steps to find your perfect travel companion</Text>
          </div>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable style={{ height: '100%', borderRadius: 12 }} bodyStyle={{ padding: 20 }}>
                <div style={{ background: 'var(--accent-2)', width: 48, height: 48, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <img src={ASSETS.profileIcon} alt="profile" style={{ width: 24, height: 24 }} />
                </div>
                <Title level={4}>Create Profile</Title>
                <Paragraph type="secondary" className="mb-0">Share your travel style and interests.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable style={{ height: '100%', borderRadius: 12 }} bodyStyle={{ padding: 20 }}>
                <div style={{ background: 'var(--accent-2)', width: 48, height: 48, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <img src={ASSETS.settingIcon} alt="settings" style={{ width: 24, height: 24 }} />
                </div>
                <Title level={4}>Set Preferences</Title>
                <Paragraph type="secondary" className="mb-0">Choose destinations and dates.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable style={{ height: '100%', borderRadius: 12 }} bodyStyle={{ padding: 20 }}>
                <div style={{ background: 'var(--accent-2)', width: 48, height: 48, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <img src={ASSETS.starIcon} alt="match" style={{ width: 24, height: 24 }} />
                </div>
                <Title level={4}>Smart Matching</Title>
                <Paragraph type="secondary" className="mb-0">Our AI connects you with compatible travelers.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable style={{ height: '100%', borderRadius: 12 }} bodyStyle={{ padding: 20 }}>
                <div style={{ background: 'var(--accent-2)', width: 48, height: 48, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <img src={ASSETS.commentIcon} alt="connect" style={{ width: 24, height: 24 }} />
                </div>
                <Title level={4}>Connect & Plan</Title>
                <Paragraph type="secondary" className="mb-0">Chat and plan your itinerary together.</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Criteria */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Title level={2}>Key Matching Criteria</Title>
          <Text type="secondary">We match you based on what matters most.</Text>
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ borderRadius: 12 }} bodyStyle={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={ASSETS.destinationIcon} alt="destination" style={{ width: 32, height: 32 }} />
                <Text strong>Destination Matching</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ borderRadius: 12 }} bodyStyle={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={ASSETS.criteriaIcon} alt="criteria" style={{ width: 32, height: 32 }} />
                <Text strong>Other Criteria</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ borderRadius: 12 }} bodyStyle={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={ASSETS.heartIcon} alt="interests" style={{ width: 32, height: 32 }} />
                <Text strong>Shared Interests</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ borderRadius: 12 }} bodyStyle={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={ASSETS.ageIcon} alt="age" style={{ width: 32, height: 32 }} />
                <Text strong>Age Compatibility</Text>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Safety */}
        <div id="safety" style={{ background: '#dffcf1', padding: '40px', borderRadius: 16, textAlign: 'center' }}>
          <Title level={2}>Safety First, always</Title>
          <Paragraph>Your Security is our top priority</Paragraph>
          <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
            <Col xs={24} md={8}>
              <Card hoverable style={{ height: '100%', borderRadius: 14 }} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img src={ASSETS.safetyVerified} alt="verified" style={{ width: 48, height: 48, marginBottom: 16 }} />
                <Title level={5}>Verified Profile</Title>
                <Paragraph type="secondary" className="mb-0">All travelers are identified, verified, and vetted.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card hoverable style={{ height: '100%', borderRadius: 14 }} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img src={ASSETS.safetyReviews} alt="reviews" style={{ width: 48, height: 48, marginBottom: 16 }} />
                <Title level={5}>Community Reviews</Title>
                <Paragraph type="secondary" className="mb-0">Real feedback from other travelers you trust.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card hoverable style={{ height: '100%', borderRadius: 14 }} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img src={ASSETS.safetySupport} alt="support" style={{ width: 48, height: 48, marginBottom: 16 }} />
                <Title level={5}>24/7 Emergency Support</Title>
                <Paragraph type="secondary" className="mb-0">Our team is always here when you need us.</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </main>

      <footer style={{ background: '#000', padding: '24px 0', textAlign: 'center', color: '#fff' }}>
        <Title level={4} style={{ color: '#fff', margin: 0 }}>Journey Together</Title>
        <Text style={{ color: '#888' }}>MADE BY SYNTAX SQUAD</Text>
      </footer>
    </div>
  );
};

export default LandingPage;
