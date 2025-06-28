import React, { useState } from "react";
import { Form, Input, Button, Select, message, Card, Typography } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password, phone, role } = values;
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        phone,
        role,
      });
      message.success("Registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom, #f0f2f5, #d6e4ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "100%", width: 500 }}>
        <Card
          bordered={false}
          style={{
            width: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: 12,
          }}
        >
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            Create Your Account
          </Title>

          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "'name' is required" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "'phone' is required" }]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "'email' is required" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "'password' is required" }]}
            >
              <Input.Password placeholder="Enter a secure password" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "'role' is required" }]}
            >
              <Select placeholder="Select your role">
                <Select.Option value="patient">Patient</Select.Option>
                <Select.Option value="doctor">Doctor</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
