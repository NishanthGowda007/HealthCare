import React, { useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Button,
  Card,
  message,
  Tabs,
} from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { TabPane } = Tabs;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [doctorLogin, setDoctorLogin] = useState({ identifier: "", password: "" });
  const [patientLogin, setPatientLogin] = useState({ email: "", password: "" });
  const [doctorError, setDoctorError] = useState("");
  const [patientError, setPatientError] = useState("");
  const navigate = useNavigate();

  const getEmailByDoctorName = async (nameInput) => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "doctor"));
      const snapshot = await getDocs(q);
      for (const doc of snapshot.docs) {
        const data = doc.data();
        if (data.name && data.name.toLowerCase() === nameInput.toLowerCase()) {
          return data.email;
        }
      }
      return null;
    } catch (err) {
      console.error("Error fetching email by doctor name:", err);
      return null;
    }
  };

  const handleDoctorLogin = async () => {
    setLoading(true);
    setDoctorError(""); // clear previous error
    try {
      const isEmail = doctorLogin.identifier.includes("@");
      const emailToUse = isEmail
        ? doctorLogin.identifier
        : await getEmailByDoctorName(doctorLogin.identifier);

      if (!emailToUse) throw new Error("Doctor not found");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailToUse,
        doctorLogin.password
      );

      const q = query(
        collection(db, "users"),
        where("uid", "==", userCredential.user.uid),
        where("role", "==", "doctor")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) throw new Error("Not authorized as doctor");

      const doctorName = snapshot.docs[0].data().name || "Doctor";
      message.success(`You logged in as Dr. ${doctorName}`);
      navigate("/doctor-dashboard");
    } catch (err) {
      console.error("Doctor login failed:", err);
      if (err.code === "auth/wrong-password") {
        setDoctorError("Incorrect password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setDoctorError("No account found. Please check your credentials.");
      } else if (err.message === "Doctor not found") {
        setDoctorError("Doctor not found. Please check the name or email.");
      } else if (err.message === "Not authorized as doctor") {
        setDoctorError("Not authorized to log in as a doctor.");
      } else {
        setDoctorError("Login failed. Please try again.");
      }
    }
    setLoading(false);
  };

  const handlePatientLogin = async () => {
    setLoading(true);
    setPatientError(""); // clear previous error
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", patientLogin.email),
        where("role", "==", "patient")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) throw new Error("Not authorized as patient");

      await signInWithEmailAndPassword(auth, patientLogin.email, patientLogin.password);

      const patientName = snapshot.docs[0].data().name || "Patient";
      message.success(`Welcome back, ${patientName}`);
      navigate("/patient-dashboard");
    } catch (err) {
      console.error("Patient login failed:", err);
      if (err.code === "auth/wrong-password") {
        setPatientError("Incorrect password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setPatientError("No account found. Please check your credentials.");
      } else if (err.message === "Not authorized as patient") {
        setPatientError("Not authorized to log in as a patient.");
      } else {
        setPatientError("Login failed. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: "40px", width: "100vw", background: "#f0f2f5" }}>
      <Card
        style={{
          maxWidth: 800,
          margin: "auto",
          padding: 32,
          borderRadius: 12,
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
          🔐 HealthCare Login
        </Title>
        <Tabs centered>
          <TabPane tab="Doctor Login" key="1">
            <Input
              placeholder="Enter email or name"
              value={doctorLogin.identifier}
              onChange={(e) =>
                setDoctorLogin({ ...doctorLogin, identifier: e.target.value })
              }
              style={{ marginBottom: 12 }}
            />
            <Input.Password
              placeholder="Enter password"
              value={doctorLogin.password}
              onChange={(e) =>
                setDoctorLogin({ ...doctorLogin, password: e.target.value })
              }
              style={{ marginBottom: 8 }}
            />
            {doctorError && (
              <Typography.Text type="danger" style={{ display: "block", marginBottom: 12 }}>
                {doctorError}
              </Typography.Text>
            )}
            <Button type="primary" block loading={loading} onClick={handleDoctorLogin}>
              Login as Doctor
            </Button>
          </TabPane>

          <TabPane tab="Patient Login" key="2">
            <Input
              placeholder="Enter email"
              value={patientLogin.email}
              onChange={(e) =>
                setPatientLogin({ ...patientLogin, email: e.target.value })
              }
              style={{ marginBottom: 12 }}
            />
            <Input.Password
              placeholder="Enter password"
              value={patientLogin.password}
              onChange={(e) =>
                setPatientLogin({ ...patientLogin, password: e.target.value })
              }
              style={{ marginBottom: 8 }}
            />
            {patientError && (
              <Typography.Text type="danger" style={{ display: "block", marginBottom: 12 }}>
                {patientError}
              </Typography.Text>
            )}
            <Button type="primary" block loading={loading} onClick={handlePatientLogin}>
              Login as Patient
            </Button>
          </TabPane>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default LoginPage;
