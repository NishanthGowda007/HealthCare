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
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  <Layout style={{ height: "100vh",width: "100vw",background: "#f0f2f5",overflowX: "hidden",boxSizing: "border-box",paddingBottom: "60px" }}>
    <Content style={{  padding: "24px 16px",maxWidth: "1200px", margin: "0 auto",width: "100%", boxSizing: "border-box" }}>
        {/* Banner */}
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

        {/* Cards */}
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
                    height: "100%", // This ensures equal height
                  }}
                >
                  {card.icon}
                  <Title level={4} style={{ marginTop: 16 }}>{card.title}</Title>
                  <Text type="secondary">{card.desc}</Text>
                </Card>
              </motion.div>
            </Col>
          ))}
          </Row>  


        {/* Appointment Stats */}
        <Divider style={{ margin: "60px 0 30px" }}>📊 Appointment Stats</Divider>
        <Row gutter={[24, 24]}>
          {[
            { label: "✅ Confirmed", value: stats.confirmed },
            { label: "⏳ Pending", value: stats.pending },
            { label: "❌ Rejected", value: stats.rejected },
          ].map((item, i) => (
            <Col xs={24} sm={8} key={i}>
              <motion.div custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Card hoverable style={{ borderRadius: 14 }}>
                  <Title level={5}>{item.label}</Title>
                  <Text>{item.value} appointments</Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Login/Register */}
        <Divider style={{ margin: "60px 0 30px" }}>🔐 Get Started</Divider>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
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
                <Title level={5} style={{ marginTop: 10 }}>Login</Title>
                <Text>Access your dashboard & appointments</Text>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12}>
            <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
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
                <Title level={5} style={{ marginTop: 10 }}>Register</Title>
                <Text>Join HealthCare+ to get started</Text>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
