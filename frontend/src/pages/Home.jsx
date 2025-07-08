// const Home = () => {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         width: "100vw",
//         background: "linear-gradient(to bottom, #f0f2f5, #d6e4ff)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       <Title>Welcome to the Healthcare App</Title>
//     </div>
//   );
// }; Simple landing page

import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  message,
  Divider,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  SolutionOutlined,
  LoginOutlined,
  UserAddOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const { Content } = Layout;
const { Title, Text } = Typography;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
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

const Home = () => {
  const navigate = useNavigate();
  const [showBot, setShowBot] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const snapshot = await getDocs(collection(db, "appointments"));
        const appointments = snapshot.docs.map((doc) => doc.data());
        setStats({
          total: appointments.length,
          confirmed: appointments.filter((a) => a.status === "confirmed").length,
          pending: appointments.filter((a) => a.status === "pending").length,
          rejected: appointments.filter((a) => a.status === "rejected").length,
        });
      } catch {
        message.error("Failed to fetch appointments.");
      }
    };

    fetchAppointments();
  }, []);

  const cardsData = [
    {
      icon: <UserOutlined style={{ fontSize: 32, color: "#52c41a" }} />,
      title: "Doctor Dashboard",
      desc: "Manage and confirm appointments.",
      onClick: () => navigate("/doctor-overview"),
    },
    {
      icon: <CalendarOutlined style={{ fontSize: 32, color: "#eb2f96" }} />,
      title: "Health Events",
      desc: "Check upcoming health campaigns.",
      onClick: () => navigate("/events"),
    },
    {
      icon: <SmileOutlined style={{ fontSize: 32, color: "#1890ff" }} />,
      title: "Wellness Zone",
      desc: "Yoga, meditation & lifestyle tips.",
      onClick: () => navigate("/wellness"),
    },
    {
      icon: <SolutionOutlined style={{ fontSize: 32, color: "#faad14" }} />,
      title: "Support",
      desc: "Reach out for help & queries.",
      onClick: () => navigate("/support"),
    },
  ];

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        background: "#f0f2f5",
        overflowX: "hidden",
        paddingBottom: "60px",
      }}
    >
      <Content
        style={{
          padding: "24px 16px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
          }}
          style={{
            background: "linear-gradient(to right, #001529, #1890ff)",
            padding: "40px 20px",
            borderRadius: 20,
            textAlign: "center",
            color: "#fff",
            marginBottom: 40,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Title level={2} style={{ color: "#fff", marginBottom: 8 }}>
            Welcome to HealthCare+
          </Title>
          <Text style={{ fontSize: 16, color: "#e6f7ff" }}>
            Your digital companion for health, appointments, and well-being.
          </Text>
        </motion.div>

        <Row gutter={[24, 24]}>
          {cardsData.map((card, i) => (
            <Col xs={24} sm={12} lg={6} key={i} style={{ display: "flex" }}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                style={{ flex: 1 }}
              >
                <Card
                  hoverable
                  onClick={card.onClick}
                  style={{
                    borderRadius: 14,
                    textAlign: "center",
                    padding: "20px 10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    height: "100%",
                  }}
                >
                  {card.icon}
                  <Title level={4} style={{ marginTop: 16 }}>
                    {card.title}
                  </Title>
                  <Text type="secondary">{card.desc}</Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <Divider style={{ margin: "60px 0 30px" }}>
          📊 Appointment Stats
        </Divider>
        <Row gutter={[24, 24]}>
          {[
            { label: "✅ Confirmed", value: stats.confirmed },
            { label: "⏳ Pending", value: stats.pending },
            { label: "❌ Rejected", value: stats.rejected },
          ].map((item, i) => (
            <Col xs={24} sm={8} key={i}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card hoverable style={{ borderRadius: 14 }}>
                  <Title level={5}>{item.label}</Title>
                  <Text>{item.value} appointments</Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <Divider style={{ margin: "60px 0 30px" }}>🔐 Get Started</Divider>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card
                hoverable
                onClick={() => navigate("/login")}
                style={{
                  textAlign: "center",
                  background: "#e6f7ff",
                  borderRadius: 14,
                  marginBottom: 20,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <LoginOutlined style={{ fontSize: 28, color: "#1890ff" }} />
                <Title level={5} style={{ marginTop: 10 }}>
                  Login
                </Title>
                <Text>Access your dashboard & appointments</Text>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12}>
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card
                hoverable
                onClick={() => navigate("/register")}
                style={{
                  textAlign: "center",
                  background: "#fffbe6",
                  borderRadius: 14,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <UserAddOutlined style={{ fontSize: 28, color: "#faad14" }} />
                <Title level={5} style={{ marginTop: 10 }}>
                  Register
                </Title>
                <Text>Join HealthCare+ to get started</Text>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Content>
{/* 💬 Floating Chatbot Button */}
<div
  style={{
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  }}
>
  <button
    onClick={() => setShowBot(!showBot)}
    style={{
      backgroundColor: "#1890ff",
      border: "none",
      borderRadius: "50%",
      width: 60,
      height: 60,
      color: "white",
      fontSize: 28,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    💬
  </button>
</div>

{/* 🤖 Chatbot Popup */}
<AnimatePresence>
  {showBot && (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: 90,
        right: 20,
        zIndex: 1000,
        width: 380,
        height: 540,
        backgroundColor: "#fff",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        border: "1px solid #e6f7ff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(to right, #001529, #1890ff)",
          padding: "14px 20px",
          color: "#fff",
          fontWeight: 600,
          fontSize: "16px",
          textAlign: "center",
          position: "relative",
        }}
      >
        🤖 HealthBot – Ask me anything!
<button
  onClick={() => setShowBot(false)}
  title="Close Chat"
  style={{
    position: "absolute",
    top: 10,
    right: 12,
    backgroundColor: "#ffffff33",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "50%",
    width: 32,
    height: 32,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#ffffff55";
    e.target.style.transform = "scale(1.1)";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#ffffff33";
    e.target.style.transform = "scale(1)";
  }}
>
  <span
    style={{
      color: "#fff",
      fontWeight: "bold",
      fontSize: 18,
      lineHeight: 1,
    }}
  >
    ×
  </span>
</button>



      </div>

      {/* Chatbot content */}
      <div style={{ flex: 1, height: "100%", position: "relative" }}>
        <style>
          {`
            .react-chatbot-kit-chat-container {
              height: 100% !important;
              width: 100%;
              background-color: #fff;
              border-radius: 0 0 18px 18px;
              display: flex;
              flex-direction: column;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .react-chatbot-kit-chat-message-container {
              flex: 1;
              overflow-y: auto;
              padding: 12px 14px;
              scroll-behavior: smooth;
            }

            .react-chatbot-kit-chat-bot-message {
              background: linear-gradient(to right, #001529, #1890ff);
              color: #fff;
              border-radius: 16px 16px 16px 4px;
              padding: 10px 14px;
              margin-bottom: 8px;
              display: inline-block;
              max-width: 80%;
              position: relative;
              margin-left: 5px;
              padding-left: 12px;
            }
            .react-chatbot-kit-user-chat-message { /*  Nav input madodu message style */
              background-color: #e6f7ff;
              color: #000;
              border-radius: 16px 16px 4px 16px;
              padding: 10px 14px;
              margin-bottom: 8px;
              display: inline-block;
              max-width: 80%;
              align-self: flex-end;
              margin-right: 10px;
            }

            .react-chatbot-kit-chat-input-container {
              padding: 10px;
              padding-bottom: 20px;
              background: #f0f2f5;
              display: flex;
              align-items: center;
              border-top: 1px solid #d9d9d9;
            }

            .react-chatbot-kit-chat-input {
              flex: 1;
              border-radius: 8px;
              border: 1px solid #ccc;
              padding: 8px 12px;
              margin-right: 3px;
              font-size: 14px;
            }

            .react-chatbot-kit-chat-btn-send {
              background: #1890ff;
              color: #fff;
              border: none;
              border-radius: 8px;
              padding: 8px 14px;
              cursor: pointer;
              font-weight: 600;
              box-shadow: 0 2px 6px rgba(0,0,0,0.15);
              transition: background 0.3s;
            }

            .react-chatbot-kit-chat-btn-send:hover {
              background: #40a9ff;
            }

            .react-chatbot-kit-chat-bot-avatar {
              background-color: #001529;
              color: white;
              font-size: 12px;
              font-weight: bold;
              width: 28px;
              height: 28px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              position: absolute;
              left: -34px;
              top: 8px;
            }

            ::-webkit-scrollbar {
              width: 6px;
            }

            ::-webkit-scrollbar-thumb {
              background-color: #1890ff;
              border-radius: 6px;
            }

            ::-webkit-scrollbar-track {
              background: transparent;
            }
            .bot-avatar,
            .user-avatar {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              font-size: 14px;
              font-weight: bold;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #001529;
              color: #fff;
              margin-right: 8px;
              align-self: flex-start; /* default */
              width: "min(95vw, 380px)",
              height: "min(85vh, 540px)",
              position: relative;
              top: 4px;
              margin-top: 4px; /* try adjusting between 2px to 6px */
            }

            .user-avatar {
              background-color: #1890ff;
            }


          `}
        </style>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </Layout>
  );
};

export default Home;
