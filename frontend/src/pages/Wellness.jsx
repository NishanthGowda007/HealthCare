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
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

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

const lifestyleTips = [
  {
    icon: <SmileOutlined style={{ fontSize: 32, color: "#52c41a" }} />,
    title: "Morning Yoga",
    desc: "Start your day with 15 minutes of yoga for energy and flexibility.",
    bg: "#f6ffed",
  },
  {
    icon: <HeartOutlined style={{ fontSize: 32, color: "#eb2f96" }} />,
    title: "Mindfulness",
    desc: "Take 10 minutes daily to focus on your breath and calm your mind.",
    bg: "#fff0f6",
  },
  {
    icon: <CoffeeOutlined style={{ fontSize: 32, color: "#1890ff" }} />,
    title: "Stay Hydrated",
    desc: "Drink at least 8 glasses of water daily to keep your body active.",
    bg: "#e6f7ff",
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: 32, color: "#faad14" }} />,
    title: "Regular Activity",
    desc: "Move for at least 30 minutes a day to maintain physical health.",
    bg: "#fffbe6",
  },
];

const Wellness = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "60px",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 16px" }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
          }}
          style={{
            background: "linear-gradient(to right, #001529, #1890ff)",
            padding: "24px",
            borderRadius: 20,
            color: "#fff",
            marginTop: 20,
            marginBottom: 40,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          }}
        >
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            🧘 Wellness Center & Lifestyle Care
          </Title>
          <Text style={{ color: "#e6f7ff" }}>
            Boost your well-being with simple daily practices
          </Text>
        </motion.div>

        {/* Tip of the Day */}
        <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Card
            style={{
              background: "#f9f0ff",
              borderRadius: 12,
              textAlign: "center",
              marginBottom: 40,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
            hoverable
          >
            {tipOfTheDay.icon}
            <Title level={4} style={{ marginTop: 12 }}>{tipOfTheDay.title}</Title>
            <Text type="secondary">{tipOfTheDay.description}</Text>
          </Card>
        </motion.div>

        {/* Lifestyle Tips */}
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          {lifestyleTips.map((item, index) => (
            <Col xs={24} md={12} key={index}>
              <motion.div custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Card
                  hoverable
                  style={{
                    backgroundColor: item.bg,
                    borderRadius: 12,
                    minHeight: 180,
                    textAlign: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  {item.icon}
                  <Title level={4} style={{ marginTop: 12 }}>{item.title}</Title>
                  <Text type="secondary">{item.desc}</Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Videos Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={4}>
          <Title level={4} style={{ marginTop: 30 }}>
            <YoutubeOutlined style={{ marginRight: 8 }} />
            Guided Wellness Videos
          </Title>
        </motion.div>

        <Row gutter={[24, 24]}>
          {videoLinks.map((video, index) => (
            <Col xs={24} sm={12} key={index}>
              <motion.div custom={index + 5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
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
                    />
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Wellness;
