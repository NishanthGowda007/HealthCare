import React, { useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Form,
  Input,
  Button,
  message,
  Modal,
} from "antd";
import {
  SendOutlined,
  MailOutlined,
  PhoneOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Support = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await addDoc(collection(db, "supportMessages"), {
        email: values.email,
        message: values.message,
        createdAt: serverTimestamp(),
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving message:", error);
      message.error("Failed to submit. Please try again later.");
    }
  };

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        background: "#f0f2f5",
        overflowY: "auto",
        paddingBottom: "60px",
      }}
    >
      {/* Header */}
      <Header
        style={{
          background: "#001529",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          📞 Help & Support
        </Title>
      </Header>

      {/* Content aligned left */}
      <Content
        style={{
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // ensures vertical stacking
          minHeight: "calc(100vh - 64px)", // header height excluded
        }}
      >
        <div style={{ width: "100%", maxWidth: 900 ,paddingTop: "10px" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            type="link"
            onClick={() => navigate("/")}
            style={{ marginBottom: 20 }}
          >
            Back to Home
          </Button>

          <Card
            title={
              <Title level={3} style={{ margin: 0 }}>
                📝 Contact Support
              </Title>
            }
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              background: "#ffffff",
            }}
          >
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 24 }}
            >
              Have questions or facing issues? We're here to help.
            </Text>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Your Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="example@email.com"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter your message" }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Describe your issue or question..."
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  htmlType="submit"
                  block
                  size="large"
                  style={{ borderRadius: 8 }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>

            <div style={{ marginTop: 24 }}>
              <Text type="secondary">
                Or contact us directly:<br />
                <MailOutlined /> support@healthcare.com<br />
                <PhoneOutlined /> +91-9876543210
              </Text>
            </div>
          </Card>
        </div>
      </Content>

      {/* Modal */}
      <Modal
        open={modalVisible}
        centered
        footer={null}
        closable={false}
        onCancel={() => {
          setModalVisible(false);
          navigate("/");
        }}
        bodyStyle={{ textAlign: "center", padding: "40px" }}
      >
        <img
          src="https://img.icons8.com/fluency/96/checked.png"
          alt="success"
          style={{ marginBottom: 20 }}
        />
        <Title level={3}>Thanks for reaching out!</Title>
        <Text>
          We’ve received your message. Our support team will get back to you shortly.
        </Text>
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(false);
            navigate("/");
          }}
          style={{ marginTop: 24 }}
        >
          Go to Home
        </Button>
      </Modal>
    </Layout>
  );
};

export default Support;
