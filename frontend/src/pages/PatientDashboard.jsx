// // const PatientDashboard = () => {
// //   const [loading, setLoading] = useState(false);
// //     const navigate = useNavigate();


// //   const onFinish = async (values) => {
// //     const patientId = auth.currentUser?.uid
// //     const data = {
// //       ...values,
// //       patientId,
// //       doctorId: "Eq91Wzc3byVhw1Lo3KYdPNXFNUl2",
// //       status: "pending",
// //     };

// //     try {
// //       setLoading(true);
// //       const res = await axios.post("http://localhost:5000/appointments", data);
// //       console.log("Booked appointment:", res.data);
// //       message.success("Appointment booked!");
// //       navigate("/"); 
      
// //     } catch (error) {
// //       console.error("Booking error:", error);
// //       message.error("Booking failed");
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
// //       <Card title="Book an Appointment">
// //         <Form layout="vertical" onFinish={onFinish}>
// //           <Form.Item name="date" label="Date" rules={[{ required: true }]}>
// //             <DatePicker />
// //           </Form.Item>
// //           <Form.Item name="time" label="Time" rules={[{ required: true }]}>
// //             <TimePicker use12Hours format="h:mm a" />
// //           </Form.Item>
// //           <Form.Item>
// //             <Button type="primary" htmlType="submit" block loading={loading}>
// //               Book Appointment
// //             </Button>
// //           </Form.Item>
// //         </Form>
// //       </Card>
// //     </div>
// //   );


// // }; // For a single doctor

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { db } from "../firebase";
// import { getAuth, signOut } from "firebase/auth";
// import {
//   Layout,
//   Form,
//   Button,
//   DatePicker,
//   TimePicker,
//   Select,
//   Card,
//   Typography,
//   message,
//   Modal,
//   Avatar,
//   Menu,
//   Dropdown,
// } from "antd";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import {
//   UserOutlined,
//   LogoutOutlined,
//   CalendarOutlined,
// } from "@ant-design/icons";
// import { collection, getDocs, query, where } from "firebase/firestore";

// const { Header, Content } = Layout;
// const { Title, Text } = Typography;
// const { Option } = Select;

// const PatientDashboard = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState({ doctor: "", date: "", time: "" });
//   const [patientInfo, setPatientInfo] = useState(null);

//   const navigate = useNavigate();
//   const auth = getAuth();
//   const patient = auth.currentUser;

//   const disabledDate = (current) => current && current < dayjs().startOf("day");

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const q = query(collection(db, "users"), where("role", "==", "doctor"));
//         const querySnapshot = await getDocs(q);
//         const docs = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setDoctors(docs);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//         message.error("Failed to load doctors.");
//       }
//     };

//     const fetchPatientInfo = async () => {
//       if (!patient) return;
//       try {
//         const q = query(collection(db, "users"), where("uid", "==", patient.uid));
//         const snapshot = await getDocs(q);
//         if (!snapshot.empty) {
//           setPatientInfo(snapshot.docs[0].data());
//         }
//       } catch (err) {
//         console.error("Error fetching patient info:", err);
//       }
//     };

//     fetchDoctors();
//     fetchPatientInfo();
//   }, [patient]);

//   const onFinish = async (values) => {
//     const { doctorId, date, time } = values;
//     if (!patient) {
//       message.error("You must be logged in.");
//       return navigate("/login");
//     }

//     const selectedDoctor = doctors.find((doc) => doc.uid === doctorId);
//     const formattedDate = date.format("DD MMM YYYY");
//     const formattedTime = time.format("HH:mm");

//     try {
//       setLoading(true);
//       await axios.post("http://localhost:5000/appointments", {
//         doctorId,
//         patientId: patient.uid,
//         date: date.format("YYYY-MM-DD"),
//         time: time.format("HH:mm"),
//         status: "pending",
//       });

//       setModalContent({
//         doctor: selectedDoctor?.name || "Unknown",
//         date: formattedDate,
//         time: formattedTime,
//       });
//       setModalVisible(true);
//     } catch (error) {
//       console.error("Booking error:", error);
//       message.error("Failed to book appointment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       message.success("Logged out successfully");
//       navigate("/login");
//     } catch {
//       message.error("Logout failed");
//     }
//   };

//   const profileMenu = (
//     <Menu>
//       <Menu.Item key="profile" icon={<UserOutlined />} disabled>
//         {patientInfo?.name || patient?.email}
//         <br />
//         <Text type="secondary" style={{ fontSize: 12 }}>{patient?.email}</Text>
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Layout style={{ minHeight: "100vh", width: "100vw", background: "#f0f2f5" }}>
//       {/* Header */}
//       <Header
//         style={{
//           background: "#001529",
//           padding: "0 24px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Title level={3} style={{ color: "#fff", margin: 0 }}>
//           <CalendarOutlined style={{ marginRight: 10 }} />
//           Patient Dashboard
//         </Title>
//         {patient && (
//           <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
//               <Avatar style={{ backgroundColor: "#1890ff" }} icon={<UserOutlined />} />
//               <Text style={{ color: "#fff" }}>
//                 {patientInfo?.name || patient.email}
//               </Text>
//             </div>
//           </Dropdown>
//         )}
//       </Header>

//       {/* Content */}
//       <Content style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: 520,
//             borderRadius: 16,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//             border: "1px solid #f0f0f0",
//           }}
//           title={
//             <Title level={4} style={{ textAlign: "center", marginBottom: 0 }}>
//               🩺 Book an Appointment
//             </Title>
//           }
//         >
//           <Form layout="vertical" onFinish={onFinish}>
//             <Form.Item
//               label={<Text strong>Select Doctor</Text>}
//               name="doctorId"
//               rules={[{ required: true, message: "Please select a doctor" }]}
//             >
//               <Select placeholder="Choose a doctor">
//                 {doctors.map((doc) => (
//                   <Option key={doc.uid} value={doc.uid}>
//                     Dr. {doc.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label={<Text strong>Select Date</Text>}
//               name="date"
//               rules={[{ required: true, message: "Please choose a date" }]}
//             >
//               <DatePicker
//                 style={{ width: "100%" }}
//                 disabledDate={disabledDate}
//                 placeholder="Pick a date"
//               />
//             </Form.Item>

//             <Form.Item
//               label={<Text strong>Select Time</Text>}
//               name="time"
//               rules={[{ required: true, message: "Please choose a time" }]}
//             >
//               <TimePicker
//                 format="HH:mm"
//                 use12Hours={false}
//                 style={{ width: "100%" }}
//                 placeholder="Pick a time"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 block
//                 style={{ borderRadius: 8 }}
//               >
//                 Book Now
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//       </Content>

//       {/* Confirmation Modal */}
//       <Modal
//         open={modalVisible}
//         centered
//         footer={null}
//         closable={false}
//         onCancel={() => {
//           setModalVisible(false);
//           navigate("/");
//         }}
//         bodyStyle={{ padding: "32px", textAlign: "center" }}
//       >
//         <img
//           src="https://img.icons8.com/fluency/96/checked.png"
//           alt="success"
//           style={{ marginBottom: 20 }}
//         />
//         <Title level={3}>Appointment Booked!</Title>
//         <p>
//           Your appointment with <strong>Dr. {modalContent.doctor}</strong><br />
//           on <strong>{modalContent.date}</strong> at <strong>{modalContent.time}</strong><br />
//           has been successfully scheduled.
//         </p>
//         <Button type="primary" onClick={() => {
//           setModalVisible(false);
//           navigate("/");
//         }}>
//           Close
//         </Button>
//       </Modal>
//     </Layout>
//   );
// };

// export default PatientDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Form,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Card,
  Typography,
  message,
  Modal,
  Avatar,
  Menu,
  Dropdown,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  UserOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ doctor: "", date: "", time: "" });
  const [patientInfo, setPatientInfo] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();
  const patient = auth.currentUser;

  const disabledDate = (current) => current && current < dayjs().startOf("day");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "doctor"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(docs);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        message.error("Failed to load doctors.");
      }
    };

    const fetchPatientInfo = async () => {
      if (!patient) return;
      try {
        const q = query(collection(db, "users"), where("uid", "==", patient.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setPatientInfo(snapshot.docs[0].data());
        }
      } catch (err) {
        console.error("Error fetching patient info:", err);
      }
    };

    fetchDoctors();
    fetchPatientInfo();
  }, [patient]);

  const onFinish = async (values) => {
    const { doctorId, date, time } = values;
    if (!patient) {
      message.error("You must be logged in.");
      return navigate("/login");
    }

    const selectedDoctor = doctors.find((doc) => doc.uid === doctorId);
    const formattedDate = date.format("DD MMM YYYY");
    const formattedTime = time.format("HH:mm");

    try {
      setLoading(true);
      // await axios.post("http://localhost:5000/appointments", {
      await axios.post(`${process.env.REACT_APP_API_URL}/appointments`, {
        doctorId,
        patientId: patient.uid,
        date: date.format("YYYY-MM-DD"),
        time: time.format("HH:mm"),
        status: "pending",
      });

      setModalContent({
        doctor: selectedDoctor?.name || "Unknown",
        date: formattedDate,
        time: formattedTime,
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Booking error:", error);
      message.error("Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Logged out successfully");
      navigate("/login");
    } catch {
      message.error("Logout failed");
    }
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} disabled>
        {patientInfo?.name || patient?.email}
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>{patient?.email}</Text>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw", background: "#f9f9f9" }}>
      {/* Header with left and right aligned content */}
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
          marginBottom: 40,
          color: "#fff",
          marginTop: 20,
          marginLeft: "10px",
          marginRight: "10px",
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          alignItems: "center",
        }}
      >
        {/* Left side - title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <CalendarOutlined style={{ marginRight: 5, fontSize: 20 }} />
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            Book an Appointment
          </Title>
        </div>

        {/* Right side - profile dropdown */}
        {patient && (
          <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <Avatar style={{ backgroundColor: "#1890ff" }}>
                {patientInfo?.name?.charAt(0)?.toUpperCase() || "P"}
              </Avatar>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
                {patientInfo?.name || patient?.email || "Patient"}
              </Text>
            </div>
          </Dropdown>
        )}
      </motion.div>

      {/* Form Card */}
      <Content style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: "100%",
            maxWidth: 520,
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            border: "1px solid #f0f0f0",
            backgroundColor: "#fff",
          }}
          title={
            <Title level={4} style={{ textAlign: "center", marginBottom: 0 }}>
              🩺 Fill in your details
            </Title>
          }
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<Text strong>Select Doctor</Text>}
              name="doctorId"
              rules={[{ required: true, message: "Please select a doctor" }]}
            >
              <Select placeholder="Choose a doctor">
                {doctors.map((doc) => (
                  <Option key={doc.uid} value={doc.uid}>
                    Dr. {doc.name} {doc.specialization ? `- ${doc.specialization}` : ""}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={<Text strong>Select Date</Text>}
              name="date"
              rules={[{ required: true, message: "Please choose a date" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={disabledDate}
                placeholder="Pick a date"
              />
            </Form.Item>

            <Form.Item
              label={<Text strong>Select Time</Text>}
              name="time"
              rules={[{ required: true, message: "Please choose a time" }]}
            >
              <TimePicker
                format="HH:mm"
                use12Hours={false}
                style={{ width: "100%" }}
                placeholder="Pick a time"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{ borderRadius: 8 }}
              >
                Book Appointment
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>

      {/* Confirmation Modal */}
      <Modal
        open={modalVisible}
        centered
        footer={null}
        closable={false}
        onCancel={() => {
          setModalVisible(false);
          navigate("/");
        }}
        bodyStyle={{ padding: "32px", textAlign: "center" }}
      >
        <img
          src="https://img.icons8.com/fluency/96/checked.png"
          alt="success"
          style={{ marginBottom: 20 }}
        />
        <Title level={3}>Appointment Booked!</Title>
        <p>
          Your appointment with <strong>Dr. {modalContent.doctor}</strong><br />
          on <strong>{modalContent.date}</strong> at <strong>{modalContent.time}</strong><br />
          has been successfully scheduled.
        </p>
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(false);
            navigate("/");
          }}
        >
          Go to Home
        </Button>
      </Modal>
    </Layout>
  );
};

export default PatientDashboard;
