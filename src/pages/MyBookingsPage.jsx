import React from 'react';
import { Layout, Typography, Card, List, Tag, Button } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, CarOutlined, HomeOutlined } from '@ant-design/icons';
import BottomNav from '../components/BottomNav';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const mockBookings = [
  {
    id: 1,
    title: 'Round Trip Flight to Goa',
    type: 'Flight',
    date: '15 Oct 2023',
    status: 'Upcoming',
    icon: <EnvironmentOutlined style={{ color: '#1890ff' }} />,
    details: 'Indigo 6E-234 • Departure: 10:00 AM'
  },
  {
    id: 2,
    title: 'Beachfront Resort Stay',
    type: 'Hotel',
    date: '15 Oct 2023 - 20 Oct 2023',
    status: 'Upcoming',
    icon: <HomeOutlined style={{ color: '#52c41a' }} />,
    details: 'Taj Exotica Resort & Spa • 5 Nights'
  },
  {
    id: 3,
    title: 'Airport Transfer Cab',
    type: 'Cab',
    date: '15 Oct 2023',
    status: 'Upcoming',
    icon: <CarOutlined style={{ color: '#faad14' }} />,
    details: 'Sedan AC • Pick-up: Dabolim Airport'
  },
  {
    id: 4,
    title: 'Manali Trekking Expedition',
    type: 'Package',
    date: '02 Jan 2023',
    status: 'Completed',
    icon: <EnvironmentOutlined style={{ color: '#8c8c8c' }} />,
    details: 'Included: Flights, Hotel, Guide'
  }
];

const MyBookingsPage = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f8f7', paddingBottom: 80 }}>
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Title level={4} style={{ margin: 0 }}>My Bookings</Title>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
        <Title level={3}>Manage your trips</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>View all your upcoming and past reservations</Text>

        <List
          itemLayout="horizontal"
          dataSource={mockBookings}
          renderItem={item => (
            <Card style={{ marginBottom: 16, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} bodyStyle={{ padding: '16px 20px' }}>
              <List.Item
                actions={[<Button type="link">View Details</Button>]}
              >
                <List.Item.Meta
                  avatar={<div style={{ padding: 12, background: '#f0f5ff', borderRadius: 8, fontSize: 24 }}>{item.icon}</div>}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ fontSize: 16 }}>{item.title}</Text>
                      <Tag color={item.status === 'Upcoming' ? 'blue' : 'default'}>{item.status}</Tag>
                    </div>
                  }
                  description={
                    <div style={{ marginTop: 8 }}>
                      <div style={{ marginBottom: 4 }}><CalendarOutlined /> {item.date}</div>
                      <div>{item.details}</div>
                    </div>
                  }
                />
              </List.Item>
            </Card>
          )}
        />
      </Content>
      <BottomNav />
    </Layout>
  );
};

export default MyBookingsPage;
