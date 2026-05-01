import { ConfigProvider } from 'antd';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import FindBuddiesPage from './pages/FindBuddiesPage';
import AiPlannerPage from './pages/AiPlannerPage';
import MyBookingsPage from './pages/MyBookingsPage';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5b9fbf',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          borderRadius: 12,
        },
      }}
    >
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/buddies" element={<FindBuddiesPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/planner" element={<AiPlannerPage />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
