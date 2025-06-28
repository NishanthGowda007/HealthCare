import React, { useEffect, useState } from "react";
import { Select, Tabs, List, Card, Typography, Spin } from "antd";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const { Option } = Select;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

const DoctorAppointmentsDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const docs = snapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((u) => u.role === "doctor");
    setDoctors(docs);
  };

  const fetchAppointments = async (doctorId) => {
    setLoading(true);
    const q = query(collection(db, "appointments"), where("doctorId", "==", doctorId));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDoctorChange = (value) => {
    setSelectedDoctor(value);
    fetchAppointments(value);
  };

  const renderAppointments = (status) => (
    <List
      itemLayout="horizontal"
      dataSource={appointments.filter((a) => a.status === status)}
      renderItem={(item) => (
        <List.Item>
          <Card style={{ width: "100%" }}>
            <Text strong>Patient:</Text> {item.patientId} <br />
            <Text strong>Date:</Text> {item.date} <br />
            <Text strong>Time:</Text> {item.time} <br />
            <Text strong>Status:</Text> {item.status}
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <div style={{ padding: 24, minHeight: "100vh",width:"100wh", background: "#f0f2f5" }}>
      <Title level={3}>Doctor Appointments Dashboard</Title>

      <Select
        placeholder="Select a Doctor"
        style={{ width: 300, marginBottom: 24 }}
        onChange={handleDoctorChange}
      >
        {doctors.map((doc) => (
          <Option key={doc.uid} value={doc.uid}>
            {doc.email} {/* or doc.name if available */}
          </Option>
        ))}
      </Select>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
         <Spin size="large" />
        </div>
      ) : selectedDoctor ? (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Confirmed" key="1">
            {renderAppointments("confirmed")}
          </TabPane>
          <TabPane tab="Pending" key="2">
            {renderAppointments("pending")}
          </TabPane>
          <TabPane tab="Rejected" key="3">
            {renderAppointments("rejected")}
          </TabPane>
        </Tabs>
      ) : (
        <Text type="secondary">Please select a doctor to view appointments</Text>
      )}
    </div>
  );
};

export default DoctorAppointmentsDashboard;
