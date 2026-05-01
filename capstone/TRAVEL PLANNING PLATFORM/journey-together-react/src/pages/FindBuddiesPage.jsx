import React, { useState } from 'react';
import { Layout, Input, Button, Card, Row, Col, Typography, Avatar, Tabs, message, Tag, List } from 'antd';
import { ArrowLeftOutlined, SearchOutlined, UserAddOutlined, CheckOutlined, EnvironmentOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// Mock database of users for Discover
const MOCK_USERS = [
  { id: 1, name: 'Sarah Connor', avatar: 'https://i.pravatar.cc/150?img=5', destination: 'Goa', interests: ['Beaches', 'Parties', 'Surfing'], bio: 'Looking for a chill buddy to explore North Goa beaches.' },
  { id: 2, name: 'Rahul Sharma', avatar: 'https://i.pravatar.cc/150?img=11', destination: 'Manali', interests: ['Trekking', 'Mountains', 'Photography'], bio: 'Planning a trek to Rohtang Pass. Need adventurous people!' },
  { id: 3, name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?img=9', destination: 'Bali', interests: ['Yoga', 'Food', 'Culture'], bio: 'Want to rent a villa and explore local food markets.' },
  { id: 4, name: 'David Smith', avatar: 'https://i.pravatar.cc/150?img=12', destination: 'Goa', interests: ['Backpacking', 'History'], bio: 'Exploring old Goa and Portuguese architecture.' },
  { id: 5, name: 'Aisha Khan', avatar: 'https://i.pravatar.cc/150?img=20', destination: 'Dubai', interests: ['Shopping', 'Luxury', 'Desert Safari'], bio: 'Dubai shopping festival! Let us go together.' },
  { id: 6, name: 'Michael Trek', avatar: 'https://i.pravatar.cc/150?img=33', destination: 'Manali', interests: ['Camping', 'Bonfire'], bio: 'Setting up camps in Solang Valley.' }
];

// Mock database of existing friends
const MOCK_FRIENDS = [
  { id: 101, name: 'Jessica Alba', avatar: 'https://i.pravatar.cc/150?img=1', lastTrip: 'Travelled to Bali on Jan 2023', status: 'Online' },
  { id: 102, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=13', lastTrip: 'Travelled to Goa on Mar 2023', status: 'Offline' },
  { id: 103, name: 'Priya Singh', avatar: 'https://i.pravatar.cc/150?img=16', lastTrip: 'Travelled to Manali on Dec 2022', status: 'Online' }
];

const FindBuddiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const [requestedIds, setRequestedIds] = useState([]);

  const handleSearch = (value) => {
    const text = value.toLowerCase();
    setSearchTerm(text);
    if (!text.trim()) {
      setFilteredUsers(MOCK_USERS);
      return;
    }
    const matched = MOCK_USERS.filter(user => 
      user.destination.toLowerCase().includes(text) ||
      user.name.toLowerCase().includes(text) ||
      text.includes(user.destination.toLowerCase())
    );
    setFilteredUsers(matched);
  };

  const handleConnect = (userId) => {
    setRequestedIds(prev => [...prev, userId]);
    message.success('Connection request sent!');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f8f7', paddingBottom: 80 }}>
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', zIndex: 10 }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/home')} style={{ marginRight: 16 }} />
        <Title level={4} style={{ margin: 0 }}>Buddies</Title>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        <Tabs defaultActiveKey="1" centered size="large">
          <Tabs.TabPane tab="Find Buddies" key="1">
            <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 20 }}>
              <Title level={2}>Where are you going?</Title>
              <Paragraph type="secondary" style={{ fontSize: '1.1rem', marginBottom: 24 }}>
                Type your destination (e.g., "I have to go to Goa") to find profiles nearby.
              </Paragraph>
              <Input.Search 
                size="large"
                placeholder="e.g., I want to go to Manali..."
                allowClear
                enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ maxWidth: 600, margin: '0 auto' }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <Text strong style={{ fontSize: '1.1rem' }}>
                {filteredUsers.length} {filteredUsers.length === 1 ? 'Traveler' : 'Travelers'} found {searchTerm && `matching your search`}
              </Text>
            </div>

            <Row gutter={[24, 24]}>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => {
                  const isRequested = requestedIds.includes(user.id);
                  return (
                    <Col xs={24} sm={12} md={8} key={user.id}>
                      <Card hoverable style={{ borderRadius: 16, height: '100%', display: 'flex', flexDirection: 'column' }} bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                          <Avatar size={64} src={user.avatar} />
                          <div>
                            <Title level={5} style={{ margin: 0 }}>{user.name}</Title>
                            <Text type="secondary" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <EnvironmentOutlined style={{ color: 'var(--accent)' }} />
                              {user.destination}
                            </Text>
                          </div>
                        </div>
                        <Paragraph type="secondary" style={{ flex: 1 }}>"{user.bio}"</Paragraph>
                        <div style={{ marginBottom: 20 }}>
                          {user.interests.map(interest => (
                            <Tag color="cyan" key={interest} style={{ marginBottom: 4 }}>{interest}</Tag>
                          ))}
                        </div>
                        <Button 
                          type={isRequested ? "default" : "primary"}
                          block 
                          size="large"
                          icon={isRequested ? <CheckOutlined /> : <UserAddOutlined />}
                          onClick={() => !isRequested && handleConnect(user.id)}
                          style={{ borderRadius: 8, background: isRequested ? '#f0f0f0' : 'var(--accent)', color: isRequested ? '#52c41a' : '#fff', borderColor: isRequested ? '#d9d9d9' : 'var(--accent)' }}
                        >
                          {isRequested ? 'Request Sent' : 'Connect'}
                        </Button>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <Col span={24}>
                  <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16 }}>
                    <Title level={4} type="secondary">No buddies found for this destination yet!</Title>
                    <Paragraph>Try searching for popular places like Goa, Manali, Bali, or Dubai.</Paragraph>
                  </div>
                </Col>
              )}
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="My Friends" key="2">
            <div style={{ marginTop: 20 }}>
              <Title level={3}>Your Travel Companions</Title>
              <Paragraph type="secondary">People you have connected with on past journeys.</Paragraph>
              
              <List
                itemLayout="horizontal"
                dataSource={MOCK_FRIENDS}
                renderItem={friend => (
                  <Card style={{ marginBottom: 16, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} bodyStyle={{ padding: '16px 20px' }}>
                    <List.Item
                      actions={[
                        <Button type="primary" shape="circle" icon={<MessageOutlined />} onClick={() => navigate('/chat')} />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar size={56} src={friend.avatar} />}
                        title={
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Text strong style={{ fontSize: 16 }}>{friend.name}</Text>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: friend.status === 'Online' ? '#52c41a' : '#d9d9d9' }} title={friend.status} />
                          </div>
                        }
                        description={<Text type="secondary"><EnvironmentOutlined /> {friend.lastTrip}</Text>}
                      />
                    </List.Item>
                  </Card>
                )}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Content>
      <BottomNav />
    </Layout>
  );
};

export default FindBuddiesPage;
