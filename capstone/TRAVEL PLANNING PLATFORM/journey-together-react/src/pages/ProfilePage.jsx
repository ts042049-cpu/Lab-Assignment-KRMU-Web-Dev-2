import React from 'react';
import { Form, Input, Button, Select, DatePicker, Checkbox, Row, Col, Upload, Typography, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ProfilePage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Profile Creation Success:', values);
    navigate('/home');
  };

  const interestsOptions = ['Hiking', 'Beaches', 'Food Trips', 'Spiritual Tours', 'Adventure Sports'];

  return (
    <div className="split-screen" style={{ background: '#f6f3f1', padding: '40px 20px' }}>
      <Row className="split-container" gutter={[32, 32]} align="top">
        
        {/* Left Hero Section */}
        <Col xs={24} md={10}>
          <div style={{ background: 'linear-gradient(180deg, rgba(31,143,106,0.08), rgba(47,181,138,0.05))', padding: '40px', borderRadius: '16px', height: '100%' }}>
            <Space align="center" style={{ marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--accent), #2fb58a)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>JT</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--accent)' }}>Journey Together</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>Find like-minded travelers</div>
              </div>
            </Space>
            <Title level={2}>Create Your Travel Profile</Title>
            <Paragraph type="secondary">
              Tell us about yourself to match with the best travel buddies for your next adventure.
            </Paragraph>
            <img src={ASSETS.profileHero} alt="Group travel" style={{ width: '100%', borderRadius: 12, marginTop: 24, objectFit: 'cover', height: 250 }} />
          </div>
        </Col>

        {/* Right Form Section */}
        <Col xs={24} md={14}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <Title level={3} style={{ marginTop: 0 }}>Create Profile</Title>
            <Paragraph type="secondary" style={{ marginBottom: 24 }}>Fill the details to get started.</Paragraph>

            <Form layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Required!' }]}>
                    <Input placeholder="Your name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Required!' }]}>
                    <Input placeholder="you@example.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Mobile Number" name="mobile" rules={[{ required: true, message: 'Required!' }]}>
                    <Input placeholder="987654****" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Required!' }]}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={12}>
                  <Form.Item label="Age min" name="ageMin" rules={[{ required: true }]}>
                    <Input type="number" placeholder="18+" min={18} />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item label="Age max" name="ageMax" rules={[{ required: true }]}>
                    <Input type="number" placeholder="99" max={99} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                    <Select placeholder="Select">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Preferred Group Size" name="groupSize" rules={[{ required: true }]}>
                    <Select placeholder="Select">
                      <Option value="solo">Solo (1)</Option>
                      <Option value="couple">Couple (2)</Option>
                      <Option value="small">Small Group (3-5)</Option>
                      <Option value="large">Large Group (6+)</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Destination Preference" name="destination" rules={[{ required: true }]}>
                <Input placeholder="Goa, Manali, Dubai..." />
              </Form.Item>

              <Form.Item label="Interests" name="interests" rules={[{ required: true, message: 'Select at least one!' }]}>
                <Checkbox.Group options={interestsOptions} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} />
              </Form.Item>

              <Form.Item label="Short Bio" name="bio">
                <TextArea rows={3} placeholder="Write something about yourself..." />
              </Form.Item>

              <Form.Item label="Profile Picture" name="avatar">
                <Upload beforeUpload={() => false} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" size="large" block style={{ background: 'linear-gradient(90deg, var(--accent), #2fb58a)', border: 0 }}>
                  Create Profile
                </Button>
              </Form.Item>
              
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                 <Link to="/login" style={{ color: 'var(--accent)' }}>Already have an account? Login</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
