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
  Collapse,
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

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const Home = () => {
  const navigate = useNavigate();
  const [doctorsList, setDoctorsList] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const doctors = snapshot.docs
          .map((doc) => doc.data())
          .filter((user) => user.role === "doctor")
          .map((doc) => doc.name || doc.email);
        setDoctorsList(doctors);
      } catch {
        message.error("Failed to fetch doctors.");
      }
    };

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

    fetchDoctors();
    fetchAppointments();
  }, []);

  return (
    <Layout style={{ height: "100vh", background: "#f0f2f5",width:"100vw",overflowY: "auto", overflowX:"hidden",paddingBottom: "60px" }}>
      <Content style={{ padding: "10px 10px", maxWidth: 2100 }}>
        {/* Banner */}
        <div
          style={{
            background: "linear-gradient(to right, #1890ff, #40a9ff)",
            padding: "20px 20px",
            borderRadius: 16,
            marginBottom: 40,
            textAlign: "center",
            color: "white",
          }}
        >
          <Title level={2} style={{ color: "#fff", marginBottom: 8 }}>
            Welcome to HealthCare+
          </Title>
          <Text style={{ fontSize: 16, color: "#e6f7ff" }}>
            Your digital companion for health, appointments, and well-being.
          </Text>
        </div>

        {/* Feature Cards */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              onClick={() => navigate("/doctor-overview")}
              style={{ borderRadius: 12, textAlign: "center" }}
            >
              <UserOutlined style={{ fontSize: 32, color: "#52c41a" }} />
              <Title level={4} style={{ marginTop: 16 }}>Doctor Dashboard</Title>
              <Text type="secondary">Manage and confirm appointments.</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              onClick={() => navigate("/events")}
              style={{ borderRadius: 12, textAlign: "center" }}
            >
              <CalendarOutlined style={{ fontSize: 32, color: "#eb2f96" }} />
              <Title level={4} style={{ marginTop: 16 }}>Health Events</Title>
              <Text type="secondary">Check upcoming health campaigns.</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              onClick={() => navigate("/wellness")}
              style={{ borderRadius: 12, textAlign: "center" }}
            >
              <SmileOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <Title level={4} style={{ marginTop: 16 }}>Wellness Zone</Title>
              <Text type="secondary">Yoga, meditation & lifestyle tips.</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              onClick={() => navigate("/support")}
              style={{ borderRadius: 12, textAlign: "center" }}
            >
              <SolutionOutlined style={{ fontSize: 32, color: "#faad14" }} />
              <Title level={4} style={{ marginTop: 16 }}>Support</Title>
              <Text type="secondary">Reach out for help & queries.</Text>
            </Card>
          </Col>
        </Row>

        {/* Divider */}
        <Divider style={{ margin: "50px 0" }}>📊 Appointment Stats</Divider>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Card style={{ borderRadius: 12 }} hoverable>
              <Title level={5}>✅ Confirmed</Title>
              <Text>{stats.confirmed} appointments</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={{ borderRadius: 12 }} hoverable>
              <Title level={5}>⏳ Pending</Title>
              <Text>{stats.pending} appointments</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={{ borderRadius: 12 }} hoverable>
              <Title level={5}>❌ Rejected</Title>
              <Text>{stats.rejected} appointments</Text>
            </Card>
          </Col>
        </Row>

        {/* Divider */}
        <Divider style={{ margin: "50px 0" }}>🔐 Get Started</Divider>

        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => navigate("/login")}
              style={{
                textAlign: "center",
                background: "#e6f7ff",
                borderRadius: 12,
              }}
            >
              <LoginOutlined style={{ fontSize: 28, color: "#1890ff" }} />
              <Title level={5} style={{ marginTop: 10 }}>Login</Title>
              <Text>Access your dashboard & appointments</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => navigate("/register")}
              style={{
                textAlign: "center",
                background: "#fffbe6",
                borderRadius: 12,
              }}
            >
              <UserAddOutlined style={{ fontSize: 28, color: "#faad14" }} />
              <Title level={5} style={{ marginTop: 10 }}>Register</Title>
              <Text>Join HealthCare+ to get started</Text>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
