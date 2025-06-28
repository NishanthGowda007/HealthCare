import React from "react";
import { Typography, Card, Col, Row } from "antd";
import {
  SmileOutlined,
  HeartOutlined,
  CoffeeOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const tipOfTheDay = {
  icon: <BulbOutlined style={{ fontSize: 32, color: "#722ed1" }} />,
  title: "Tip of the Day",
  description: "Try the 4-7-8 breathing technique: Inhale for 4 sec, hold for 7, exhale for 8.",
};

const videoLinks = [
  {
    title: "10 Min Morning Yoga",
    url: "https://www.youtube.com/embed/4pKly2JojMw",
  },
  {
    title: "5 Min Breathing Exercise",
    url: "https://www.youtube.com/embed/p8fjYPC-k2k",
  },
];

const Wellness = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        paddingBottom: "60px", 
      }}
    >
      <div
        style={{
          maxWidth: "2100px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ background: "#002c47", padding: "16px 24px" }}>
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            🧘 Wellness Center & Lifestyle Care
          </Title>
        </div>

        {/* Tip of the Day */}
        <Card
          style={{
            background: "#f9f0ff",
            borderRadius: 12,
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            textAlign: "center",
            margin: "40px 0",
          }}
          hoverable
        >
          <div>{tipOfTheDay.icon}</div>
          <Title level={4} style={{ marginTop: 12 }}>
            {tipOfTheDay.title}
          </Title>
          <Text type="secondary">{tipOfTheDay.description}</Text>
        </Card>

        {/* First Row: Morning Yoga + Mindfulness */}
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          <Col xs={24} md={12}>
            <Card
              style={{
                backgroundColor: "#f6ffed",
                borderRadius: 12,
                minHeight: 180,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
              hoverable
            >
              <SmileOutlined style={{ fontSize: 32, color: "#52c41a" }} />
              <Title level={4} style={{ marginTop: 12 }}>
                Morning Yoga
              </Title>
              <Text type="secondary">
                Start your day with 15 minutes of yoga for energy and flexibility.
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              style={{
                backgroundColor: "#fff0f6",
                borderRadius: 12,
                minHeight: 180,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
              hoverable
            >
              <HeartOutlined style={{ fontSize: 32, color: "#eb2f96" }} />
              <Title level={4} style={{ marginTop: 12 }}>
                Mindfulness
              </Title>
              <Text type="secondary">
                Take 10 minutes daily to focus on your breath and calm your mind.
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Second Row: Stay Hydrated + Regular Activity */}
        <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
          <Col xs={24} md={12}>
            <Card
              style={{
                backgroundColor: "#e6f7ff",
                borderRadius: 12,
                minHeight: 180,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
              hoverable
            >
              <CoffeeOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <Title level={4} style={{ marginTop: 12 }}>
                Stay Hydrated
              </Title>
              <Text type="secondary">
                Drink at least 8 glasses of water daily to keep your body active.
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              style={{
                backgroundColor: "#fffbe6",
                borderRadius: 12,
                minHeight: 180,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
              hoverable
            >
              <ThunderboltOutlined style={{ fontSize: 32, color: "#faad14" }} />
              <Title level={4} style={{ marginTop: 12 }}>
                Regular Activity
              </Title>
              <Text type="secondary">
                Move for at least 30 minutes a day to maintain physical health.
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Videos */}
        <Title level={4} style={{ marginTop: 25 }}>
          <YoutubeOutlined style={{ marginRight: 8,paddingLeft: 5 }} />
          Guided Wellness Videos
        </Title>

        <Row gutter={[24, 24]}>
          {videoLinks.map((video, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card
                hoverable
                style={{ borderRadius: 12, overflow: "hidden" }}
                title={video.title}
              >
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                  <iframe
                    src={video.url}
                    title={video.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: 8,
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    aria-label={video.title}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Wellness;
