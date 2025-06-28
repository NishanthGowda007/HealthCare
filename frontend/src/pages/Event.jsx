import React from "react";
import { Typography, Timeline, Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const events = [
  {
    title: "World Health Day",
    date: "April 7, 2025",
    description: "Raising awareness on important health topics by WHO.",
  },
  {
    title: "No Tobacco Day",
    date: "May 31, 2025",
    description: "Global initiative to reduce tobacco use.",
  },
  {
    title: "International Yoga Day",
    date: "June 21, 2025",
    description: "Promotes healthy lifestyle through yoga.",
  },
  {
    title: "World Mental Health Day",
    date: "October 10, 2025",
    description: "Aims to raise awareness about mental well-being.",
  },
];

const Events = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#ffffff",
        paddingBottom: "60px",
      }}
    >
      <div style={{ maxWidth: "2100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ background: "#002c47", padding: "16px 24px" }}>
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            <CalendarOutlined style={{ marginRight: 10 }} />
            Health Calendar & Awareness Drives
          </Title>
        </div>

        {/* Content */}
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 30 }}>
            <Title level={2} style={{ color: "#002c47", fontWeight: "bold" }}>
              Upcoming Global Health Events
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Stay informed about important days dedicated to health and well-being.
            </Text>
          </div>

          <Timeline mode="left">
            {events.map((event, index) => (
              <Timeline.Item label={event.date} key={index}>
                <Card
                  style={{
                    backgroundColor: "#e6f7ff",
                    borderRadius: 12,
                    padding: "16px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                  }}
                  hoverable
                >
                  <Title level={4} style={{ margin: 0 }}>
                    {event.title}
                  </Title>
                  <Text type="secondary">{event.description}</Text>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default Events;
