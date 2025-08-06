// import React, { useEffect, useState } from "react";
// import {
//   Select,
//   Tabs,
//   List,
//   Typography,
//   Spin,
//   message,
//   Card,
//   Tag,
//   Button,
// } from "antd";
// import { HomeOutlined } from "@ant-design/icons";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";

// const { Option } = Select;
// const { TabPane } = Tabs;
// const { Text, Title } = Typography;

// const DoctorOverview = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [appointments, setAppointments] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const snapshot = await getDocs(
//           query(collection(db, "users"), where("role", "==", "doctor"))
//         );
//         const doctorList = snapshot.docs.map((doc) => ({
//           uid: doc.id,
//           ...doc.data(),
//         }));
//         setDoctors(doctorList);
//       } catch (err) {
//         message.error("Failed to load doctors");
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const fetchAppointments = async (doctorId) => {
//     setLoading(true);
//     try {
//       const snapshot = await getDocs(
//         query(collection(db, "appointments"), where("doctorId", "==", doctorId))
//       );
//       const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//       const enriched = await Promise.all(
//         all.map(async (appt) => {
//           try {
//             const userSnap = await getDocs(
//               query(collection(db, "users"), where("uid", "==", appt.patientId))
//             );
//             if (!userSnap.empty) {
//               const userData = userSnap.docs[0].data();
//               return {
//                 ...appt,
//                 patientName: userData.name || "Unknown",
//                 patientEmail: userData.email || "unknown@example.com",
//               };
//             }
//           } catch (err) {
//             console.error("Error fetching patient details", err);
//           }
//           return {
//             ...appt,
//             patientName: "Unknown",
//             patientEmail: "unknown@example.com",
//           };
//         })
//       );

//       const grouped = {
//         pending: enriched.filter((item) => item.status === "pending"),
//         confirmed: enriched.filter((item) => item.status === "confirmed"),
//         rejected: enriched.filter((item) => item.status === "rejected"),
//       };
//       setAppointments(grouped);
//     } catch (err) {
//       message.error("Error fetching appointments");
//     }
//     setLoading(false);
//   };

//   const handleDoctorChange = (doctorId) => {
//     setSelectedDoctor(doctorId);
//     fetchAppointments(doctorId);
//   };

//   return (
//     <div
//       style={{
//         padding: "40px 20px",
//         minHeight: "100vh",
//         width: "100vw",
//         background: "#f0f2f5",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "start",
//       }}
//     >
//       <Card
//         style={{
//           width: "100%",
//           maxWidth: "1000px",
//           borderRadius: 16,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
//         }}
//         bodyStyle={{ padding: "32px" }}
//       >
//         <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
//           🩺 Doctor Appointments Overview
//         </Title>

//         <div style={{ marginBottom: 30, textAlign: "center" }}>
//           <Text strong>Select Doctor</Text>
//           <br />
//           <Select
//             placeholder="Choose Doctor by Name"
//             style={{
//               width: "100%",
//               maxWidth: "400px",
//               marginTop: 10,
//             }}
//             onChange={handleDoctorChange}
//             value={selectedDoctor}
//           >
//             {doctors.map((doc) => (
//               <Option key={doc.uid} value={doc.uid}>
//                 Dr. {doc.name}
//               </Option>
//             ))}
//           </Select>
//         </div>

//         <div style={{ textAlign: "center", marginBottom: 24 }}>
//           <Button
//             icon={<HomeOutlined />}
//             onClick={() => navigate("/")}
//             style={{
//               backgroundColor: "#f0f5ff",
//               border: "1px solid #adc6ff",
//               color: "#2f54eb",
//               fontWeight: 600,
//               borderRadius: 8,
//             }}
//           >
//             Back to Home
//           </Button>
//         </div>

//         {loading ? (
//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
//               <Spin size="large" />
//             </div>
//           ) : (
//           selectedDoctor && (
//             <Tabs
//               defaultActiveKey="pending"
//               centered
//               style={{ marginTop: 30 }}
//             >
//               <TabPane tab=" Pending" key="pending">
//                 <AppointmentList data={appointments.pending || []} />
//               </TabPane>
//               <TabPane tab=" Confirmed" key="confirmed">
//                 <AppointmentList data={appointments.confirmed || []} />
//               </TabPane>
//               <TabPane tab=" Rejected" key="rejected">
//                 <AppointmentList data={appointments.rejected || []} />
//               </TabPane>
//             </Tabs>
//           )
//         )}
//       </Card>
//     </div>
//   );
// };

// const AppointmentList = ({ data }) => (
//   <List
//     grid={{ gutter: 16, column: 1 }}
//     dataSource={data}
//     locale={{ emptyText: "No appointments found." }}
//     renderItem={(item) => {
//       const statusColor = {
//         pending: "orange",
//         confirmed: "green",
//         rejected: "red",
//       };

//       return (
//         <List.Item>
//           <Card
//             style={{
//               width: "100%",
//               borderRadius: "12px",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//               backgroundColor: "#ffffff",
//             }}
//             title={
//               <>
//                 <Text strong>👤 {item.patientName}</Text>
//                 <br />
//                 <Text type="secondary" style={{ fontSize: 12 }}>
//                   📧 {item.patientEmail}
//                 </Text>
//               </>
//             }
//             extra={
//               <Tag color={statusColor[item.status]}>
//                 {item.status.toUpperCase()}
//               </Tag>
//             }
//           >
//             <p>
//               <b>📅 Requested On:</b>{" "}
//               {dayjs(item.date).format("MMMM D, YYYY")} at {item.time}
//             </p>
//             <p>
//               <b>🆔 Patient ID:</b> {item.patientId}
//             </p>
//           </Card>
//         </List.Item>
//       );
//     }}
//   />
// );

// export default DoctorOverview;

import React, { useEffect, useState } from "react";
import {
  Select,
  Tabs,
  List,
  Typography,
  Spin,
  message,
  Card,
  Tag,
  Button,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const DoctorOverview = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, "users"), where("role", "==", "doctor"))
        );
        const doctorList = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        setDoctors(doctorList);
      } catch (err) {
        message.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  const fetchAppointments = async (doctorId) => {
    setLoading(true);
    try {
      const snapshot = await getDocs(
        query(collection(db, "appointments"), where("doctorId", "==", doctorId))
      );
      const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const enriched = await Promise.all(
        all.map(async (appt) => {
          try {
            const userSnap = await getDocs(
              query(collection(db, "users"), where("uid", "==", appt.patientId))
            );
            if (!userSnap.empty) {
              const userData = userSnap.docs[0].data();
              return {
                ...appt,
                patientName: userData.name || "Unknown",
                patientEmail: userData.email || "unknown@example.com",
              };
            }
          } catch (err) {
            console.error("Error fetching patient details", err);
          }
          return {
            ...appt,
            patientName: "Unknown",
            patientEmail: "unknown@example.com",
          };
        })
      );

      const grouped = {
        pending: enriched.filter((item) => item.status === "pending"),
        confirmed: enriched.filter((item) => item.status === "confirmed"),
        rejected: enriched.filter((item) => item.status === "rejected"),
      };
      setAppointments(grouped);
    } catch (err) {
      message.error("Error fetching appointments");
    }
    setTimeout(() => setLoading(false), 400); // Prevent flash
  };

  const handleDoctorChange = (doctorId) => {
    setSelectedDoctor(doctorId);
    fetchAppointments(doctorId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        paddingBottom: "60px",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 16px" }}>
        {/* Gradient Header */}
        <div
          style={{
            background: "linear-gradient(to right, #001529, #1890ff)",
            padding: "24px",
            borderRadius: 20,
            color: "#fff",
            marginTop: 20,
            marginBottom: 40,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            textAlign: "left",
          }}
        >
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            🩺 Doctor Appointments Overview
          </Title>
          <Text style={{ color: "#e6f7ff" }}>
            Track doctor-specific appointment statuses with ease.
          </Text>
        </div>

        {/* Doctor Selection */}
        <div
          style={{
            marginBottom: 40,
            textAlign: "center",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text strong>Select Doctor</Text>
          <br />
          <Select
            placeholder="Choose Doctor by Name"
            style={{
              width: "100%",
              maxWidth: "800px",
              marginTop: 10,
            }}
            onChange={handleDoctorChange}
            value={selectedDoctor}
          >
            {doctors.map((doc) => (
              <Option key={doc.uid} value={doc.uid}>
                Dr. {doc.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Back Button */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Button
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#f0f5ff",
              border: "1px solid #adc6ff",
              color: "#2f54eb",
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 8,
            }}
          >
            Back to Home
          </Button>
        </div>

        {/* Conditional rendering for content */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <Spin size="large" tip="Loading appointments..." />
          </div>
        ) : selectedDoctor ? (
          <Tabs defaultActiveKey="pending" centered style={{ marginTop: 30 }}>
            <TabPane tab=" Pending" key="pending">
              <AppointmentList data={appointments.pending || []} />
            </TabPane>
            <TabPane tab=" Confirmed" key="confirmed">
              <AppointmentList data={appointments.confirmed || []} />
            </TabPane>
            <TabPane tab=" Rejected" key="rejected">
              <AppointmentList data={appointments.rejected || []} />
            </TabPane>
          </Tabs>
        ) : (
          <div style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            <Text>Please select a doctor to view their appointments.</Text>
          </div>
        )}
      </div>
    </div>
  );
};

const AppointmentList = ({ data }) => (
  <List
    grid={{ gutter: 16, column: 1 }}
    dataSource={data}
    locale={{ emptyText: "No appointments found." }}
    renderItem={(item) => {
      const statusColor = {
        pending: "orange",
        confirmed: "green",
        rejected: "red",
      };

      return (
        <List.Item>
          <Card
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              backgroundColor: "#ffffff",
            }}
            title={
              <>
                <Text strong>👤 {item.patientName}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  📧 {item.patientEmail}
                </Text>
              </>
            }
            extra={
              <Tag color={statusColor[item.status]}>
                {item.status.toUpperCase()}
              </Tag>
            }
          >
            <p>
              <b>📅 Requested On:</b>{" "}
              {dayjs(item.date).format("MMMM D, YYYY")} at {item.time}
            </p>
            <p>
              <b>🆔 Patient ID:</b> {item.patientId}
            </p>
          </Card>
        </List.Item>
      );
    }}
  />
);

export default DoctorOverview;
