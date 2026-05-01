import React from 'react';
import { Typography } from 'antd';
import { HomeOutlined, BookOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Text } = Typography;

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: '/home', icon: <HomeOutlined />, label: 'Home' },
    { key: '/bookings', icon: <BookOutlined />, label: 'Bookings' },
    { key: '/buddies', icon: <UsergroupAddOutlined />, label: 'Buddies' },
    { key: '/profile', icon: <UserOutlined />, label: 'Profile' },
  ];

  return (
    <div style={{ position: 'fixed', bottom: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-around', background: 'linear-gradient(180deg, white, #e8f7fc)', padding: '12px 10px', borderRadius: 28, boxShadow: '0 12px 30px rgba(15,23,36,0.12)', maxWidth: 480, margin: '0 auto', zIndex: 100 }}>
      {navItems.map(item => {
        const isActive = location.pathname === item.key;
        return (
          <div 
            key={item.key}
            onClick={() => navigate(item.key)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: isActive ? 'var(--accent)' : '#667', cursor: 'pointer', flex: 1 }}
          >
            {React.cloneElement(item.icon, { style: { fontSize: 22, marginBottom: 4 } })}
            <Text style={{ fontSize: 11, color: 'inherit', fontWeight: isActive ? 600 : 400 }}>{item.label}</Text>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
