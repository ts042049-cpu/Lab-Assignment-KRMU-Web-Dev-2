import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const { Title, Paragraph, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Login Success:', values);
    navigate('/home');
  };

  return (
    <div className="split-screen" style={{ background: '#f6f3f1' }}>
      <Row className="split-container" gutter={[32, 32]} align="middle">
        
        {/* Left Hero Section */}
        <Col xs={24} md={12}>
          <div style={{ background: 'linear-gradient(180deg, rgba(31,143,106,0.08), rgba(47,181,138,0.05))', padding: '40px', borderRadius: '16px', height: '100%' }}>
            <Space align="center" style={{ marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--accent), #2fb58a)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>JT</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--accent)' }}>Journey Together</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>Find like-minded travelers</div>
              </div>
            </Space>
            <Title level={2}>Connect with like-minded travelers</Title>
            <Paragraph type="secondary" style={{ maxWidth: 380 }}>
              The smartest way to find compatible travel companions based on destination, budget, and personality.
            </Paragraph>
          </div>
        </Col>

        {/* Right Form Section */}
        <Col xs={24} md={12}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <Title level={3} style={{ marginTop: 0 }}>Welcome Back</Title>
            <Paragraph type="secondary" style={{ marginBottom: 24 }}>Sign in to continue planning your next journey.</Paragraph>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                <Input size="large" placeholder="you@example.com" />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password size="large" placeholder="••••••••" />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link to="/profile" style={{ color: 'var(--accent)' }}>Create Profile</Link>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block style={{ background: 'linear-gradient(90deg, var(--accent), #2fb58a)', border: 0 }}>
                  Sign In
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Text type="secondary">or continue with</Text>
              </div>

              <Row gutter={16} justify="center">
                <Col>
                  <Button size="large" icon={<img src={ASSETS.googleLogo} alt="Google" style={{ width: 20 }} />} />
                </Col>
                <Col>
                  <Button size="large" icon={<img src={ASSETS.facebookLogo} alt="Facebook" style={{ width: 20 }} />} />
                </Col>
              </Row>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, fontSize: 13 }}>
                <Text type="secondary">By signing in you agree to our <a href="#">Terms</a></Text>
                <a href="#">Need help?</a>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
