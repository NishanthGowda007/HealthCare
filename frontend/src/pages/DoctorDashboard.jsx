// // const DoctorDashboard = () => {
// //   const [appointments, setAppointments] = useState([]);
// //   const doctorId = auth.currentUser?.uid;

// //   const fetchAppointments = async () => {
// //     const res = await axios.get(`http://localhost:5000/appointments/${doctorId}`);
// //     setAppointments(res.data);
// //   };

// //   const confirmAppointment = async (id) => {
// //     await axios.post(`http://localhost:5000/appointments/${id}/confirm`);
// //     fetchAppointments();
// //   };

// //   useEffect(() => {
// //     fetchAppointments();
// //   }, []);

// //   return (
// //     <div style={{ maxWidth: 600, margin: "auto" }}>
// //       <h2>Appointments</h2>
// //       <List
// //         dataSource={appointments}
// //         renderItem={(item) => (
// //           <List.Item
// //             actions={[
// //               item.status === "pending" && (
// //                 <Button type="primary" onClick={() => confirmAppointment(item.id)}>Confirm</Button>
// //               ),
// //             ]}
// //           >
// //             {item.date} {item.time} - {item.status}
// //           </List.Item>
// //         )}
// //       />
// //     </div>
// //   );
// // };

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Layout,
//   Typography,
//   List,
//   Card,
//   Button,
//   Tag,
//   message,
//   Skeleton,
//   Menu,
//   Dropdown,
//   Avatar,
// } from "antd";
// import { CalendarOutlined } from "@ant-design/icons";
// import { getAuth, signOut } from "firebase/auth";
// import { db } from "../firebase";
// import { getDocs, query, collection, where } from "firebase/firestore";
// import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// const { Header, Content } = Layout;
// const { Title, Text } = Typography;

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [doctorInfo, setDoctorInfo] = useState(null);

//   const auth = getAuth();
//   const doctor = auth.currentUser;
//   const navigate = useNavigate();

//   const fetchDoctorInfo = async () => {
//     if (!doctor) return;
//     try {
//       const q = query(collection(db, "users"), where("uid", "==", doctor.uid));
//       const snapshot = await getDocs(q);
//       if (!snapshot.empty) {
//         const data = snapshot.docs[0].data();
//         setDoctorInfo(data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch doctor info:", err);
//     }
//   };

//   const fetchAppointments = async () => {
//     if (!doctor) return;
//     setLoading(true);

//     try {
//       const res = await axios.get(`http://localhost:5000/appointments/${doctor.uid}`);

//       const enriched = await Promise.all(
//         res.data.map(async (item) => {
//           let patientName = "Unknown";
//           let patientEmail = "unknown@example.com";

//           try {
//             if (item.patientId) {
//               const q = query(collection(db, "users"), where("uid", "==", item.patientId));
//               const userSnap = await getDocs(q);

//               if (!userSnap.empty) {
//                 const data = userSnap.docs[0].data();
//                 patientName = data.name || "Unknown";
//                 patientEmail = data.email || "unknown@example.com";
//               }
//             }
//           } catch (err) {
//             console.error("Error fetching patient data:", err);
//           }

//           return { ...item, patientName, patientEmail };
//         })
//       );

//       setAppointments(enriched);
//     } catch (err) {
//       console.error("Error fetching appointments:", err);
//       message.error("Unable to load appointments.");
//     }

//     setLoading(false);
//   };

//   const handleAction = async (id, action, item) => {
//     try {
//       await axios.post(`http://localhost:5000/appointments/${id}/${action}`);

//       await axios.post("http://localhost:5000/send-email", {
//         to: item.patientEmail,
//         subject: `Appointment ${action === "confirm" ? "Confirmed" : "Rejected"}`,
//         html: `
//           <div style="font-family: Arial; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
//             <h2 style="color: ${action === "confirm" ? "#52c41a" : "#f5222d"}">
//               Appointment ${action === "confirm" ? "Confirmed ✅" : "Rejected ❌"}
//             </h2>
//             <p>Hello <b>${item.patientName}</b>,</p>
//             <p>Your appointment on <b>${item.date}</b> at <b>${item.time}</b> has been <b>${
//         action === "confirm" ? "confirmed" : "rejected"
//       }</b> by the doctor.</p>
//             ${
//               action === "reject"
//                 ? `<p>Please <a href="http://localhost:5173/login" style="color:#1677ff;">click here to rebook</a> at your convenience.</p>`
//                 : ""
//             }
//             <br/>
//             <p style="font-size: 12px; color: gray;">Thank you,<br/>HealthCare App</p>
//           </div>
//         `,
//       });

//       message.success(`Appointment ${action}ed`);
//       fetchAppointments();
//     } catch (err) {
//       console.error("Action failed:", err);
//       message.error(`Failed to ${action} appointment.`);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       message.success("Logged out successfully");
//       navigate("/login");
//     } catch (err) {
//       message.error("Logout failed");
//     }
//   };

//   const profileMenu = (
//     <Menu>
//       <Menu.Item key="profile" icon={<UserOutlined />} disabled>
//         {doctorInfo?.name ? `Dr. ${doctorInfo.name}` : doctor?.email}
//         <br />
//         <Text type="secondary" style={{ fontSize: 12 }}>
//           {doctor?.email}
//         </Text>
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   useEffect(() => {
//     if (doctor) {
//       fetchDoctorInfo();
//       fetchAppointments();
//     }
//   }, [doctor]);

//   const statusColor = {
//     pending: "orange",
//     confirmed: "green",
//     rejected: "red",
//   };

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
//           Doctor Dashboard
//         </Title>

//         {doctor && (
//           <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
//               <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
//               <Text style={{ color: "#fff" }}>
//                 {doctorInfo?.name ? `Dr. ${doctorInfo.name}` : doctor.email}
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
//             maxWidth: 900,
//             borderRadius: 16,
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
//           }}
//         >
//           <Title level={4} style={{ textAlign: "center", marginBottom: 30 }}>
//             📋 Appointment Overview
//           </Title>

//           {loading ? (
//             <Skeleton active paragraph={{ rows: 6 }} />
//           ) : (
//             <List
//               dataSource={appointments}
//               locale={{ emptyText: "No appointments yet." }}
//               renderItem={(item) => (
//                 <Card
//                   style={{
//                     marginBottom: 20,
//                     borderRadius: 12,
//                     border: "1px solid #f0f0f0",
//                     background: "#ffffff",
//                   }}
//                   title={
//                     <>
//                       <Text strong style={{ fontSize: 16 }}>
//                         👤 {item.patientName}
//                       </Text>
//                       <br />
//                       <Text type="secondary" style={{ fontSize: 12 }}>
//                         📧 {item.patientEmail}
//                       </Text>
//                     </>
//                   }
//                   extra={
//                     <Tag color={statusColor[item.status]}>{item.status.toUpperCase()}</Tag>
//                   }
//                   actions={
//                     item.status === "pending"
//                       ? [
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               gap: 16,
//                               width: "100%",
//                               padding: "0 16px 16px",
//                             }}
//                           >
//                             <Button
//                               type="primary"
//                               onClick={() => handleAction(item.id, "confirm", item)}
//                               block
//                             >
//                               ✅ Confirm
//                             </Button>
//                             <Button
//                               danger
//                               onClick={() => handleAction(item.id, "reject", item)}
//                               block
//                             >
//                               ❌ Reject
//                             </Button>
//                           </div>,
//                         ]
//                       : []
//                   }
//                 >
//                   <p>
//                     📅 <Text strong>Date:</Text> {item.date}
//                   </p>
//                   <p>
//                     ⏰ <Text strong>Time:</Text> {item.time}
//                   </p>
//                   <p>
//                     🆔 <Text strong>Patient ID:</Text> {item.patientId}
//                   </p>
//                 </Card>
//               )}
//             />
//           )}
//         </Card>
//       </Content>
//     </Layout>
//   );
// };

// export default DoctorDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Layout,
  Typography,
  List,
  Card,
  Button,
  Tag,
  message,
  Skeleton,
  Menu,
  Dropdown,
  Avatar,
} from "antd";
import { CalendarOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState(null);

  const auth = getAuth();
  const doctor = auth.currentUser;
  const navigate = useNavigate();

  const fetchDoctorInfo = async () => {
    if (!doctor) return;
    try {
      const q = query(collection(db, "users"), where("uid", "==", doctor.uid));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setDoctorInfo(snapshot.docs[0].data());
      }
    } catch (err) {
      console.error("Failed to fetch doctor info:", err);
    }
  };

  const fetchAppointments = async () => {
    if (!doctor) return;
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:5000/appointments/${doctor.uid}`);

      const enriched = await Promise.all(
        res.data.map(async (item) => {
          let patientName = "Unknown";
          let patientEmail = "unknown@example.com";

          try {
            if (item.patientId) {
              const q = query(collection(db, "users"), where("uid", "==", item.patientId));
              const userSnap = await getDocs(q);

              if (!userSnap.empty) {
                const data = userSnap.docs[0].data();
                patientName = data.name || "Unknown";
                patientEmail = data.email || "unknown@example.com";
              }
            }
          } catch (err) {
            console.error("Error fetching patient data:", err);
          }

          return { ...item, patientName, patientEmail };
        })
      );

      setAppointments(enriched);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      message.error("Unable to load appointments.");
    }

    setLoading(false);
  };

  const handleAction = async (id, action, item) => {
    try {
      await axios.post(`http://localhost:5000/appointments/${id}/${action}`);

      await axios.post("http://localhost:5000/send-email", {
        to: item.patientEmail,
        subject: `Appointment ${action === "confirm" ? "Confirmed" : "Rejected"}`,
        html: `
          <div style="font-family: Arial; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: ${action === "confirm" ? "#52c41a" : "#f5222d"}">
              Appointment ${action === "confirm" ? "Confirmed ✅" : "Rejected ❌"}
            </h2>
            <p>Hello <b>${item.patientName}</b>,</p>
            <p>Your appointment on <b>${item.date}</b> at <b>${item.time}</b> has been <b>${
        action === "confirm" ? "confirmed" : "rejected"
      }</b> by the doctor.</p>
            ${
              action === "reject"
                ? `<p>Please <a href="http://localhost:5173/login" style="color:#1677ff;">click here to rebook</a> at your convenience.</p>`
                : ""
            }
            <br/>
            <p style="font-size: 12px; color: gray;">Thank you,<br/>HealthCare App</p>
          </div>
        `,
      });

      message.success(`Appointment ${action}ed`);
      fetchAppointments();
    } catch (err) {
      console.error("Action failed:", err);
      message.error(`Failed to ${action} appointment.`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      message.error("Logout failed");
    }
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} disabled>
        {doctorInfo?.name ? `Dr. ${doctorInfo.name}` : doctor?.email}
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {doctor?.email}
        </Text>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (doctor) {
      fetchDoctorInfo();
      fetchAppointments();
    }
  }, [doctor]);

  const statusColor = {
    pending: "orange",
    confirmed: "green",
    rejected: "red",
  };

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw", background: "#f0f2f5" }}>
      {/* Animated Header with proper layout */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(to right, #001529, #1890ff)",
          padding: "24px",
          marginTop: 20,
          marginBottom: 40,
          marginLeft: "10px",
          marginRight: "10px",
          borderRadius:20,
          color: "#fff",
          display: "flex",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <CalendarOutlined style={{ marginRight: 10, fontSize: 20 }} />
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            Doctor Dashboard
          </Title>
        </div>

        {doctor && (
          <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
              <Text style={{ color: "#fff" }}>
                {doctorInfo?.name ? `Dr. ${doctorInfo.name}` : doctor.email}
              </Text>
            </div>
          </Dropdown>
        )}
      </motion.div>

      {/* Content */}
      <Content style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: "100%",
            maxWidth: 900,
            borderRadius: 16,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Title level={4} style={{ textAlign: "center", marginBottom: 30 }}>
            📋 Appointment Overview
          </Title>

          {loading ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <List
              dataSource={appointments}
              locale={{ emptyText: "No appointments yet." }}
              renderItem={(item) => (
                <Card
                  style={{
                    marginBottom: 20,
                    borderRadius: 12,
                    border: "1px solid #f0f0f0",
                    background: "#ffffff",
                  }}
                  title={
                    <>
                      <Text strong style={{ fontSize: 16 }}>
                        👤 {item.patientName}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        📧 {item.patientEmail}
                      </Text>
                    </>
                  }
                  extra={<Tag color={statusColor[item.status]}>{item.status.toUpperCase()}</Tag>}
                  actions={
                    item.status === "pending"
                      ? [
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 16,
                              width: "100%",
                              padding: "0 16px 16px",
                            }}
                          >
                            <Button
                              type="primary"
                              onClick={() => handleAction(item.id, "confirm", item)}
                              block
                            >
                              ~Confirm
                            </Button>
                            <Button
                              danger
                              onClick={() => handleAction(item.id, "reject", item)}
                              block
                            >
                              Reject
                            </Button>
                          </div>,
                        ]
                      : []
                  }
                >
                  <p>
                    📅 <Text strong>Date:</Text> {item.date}
                  </p>
                  <p>
                    ⏰ <Text strong>Time:</Text> {item.time}
                  </p>
                  <p>
                    🆔 <Text strong>Patient ID:</Text> {item.patientId}
                  </p>
                </Card>
              )}
            />
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default DoctorDashboard;
