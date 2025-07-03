// import React, { useState } from "react";
// import {
//   Layout,
//   Typography,
//   Card,
//   Form,
//   Input,
//   Button,
//   message,
//   Modal,
// } from "antd";
// import {
//   SendOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   ArrowLeftOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { db } from "../firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const { Header, Content } = Layout;
// const { Title, Text } = Typography;

// const Support = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     try {
//       await addDoc(collection(db, "supportMessages"), {
//         email: values.email,
//         message: values.message,
//         createdAt: serverTimestamp(),
//       });
//       setModalVisible(true);
//     } catch (error) {
//       console.error("Error saving message:", error);
//       message.error("Failed to submit. Please try again later.");
//     }
//   };

//   return (
//     <Layout
//       style={{
//         height: "100vh",
//         width: "100vw",
//         background: "#f0f2f5",
//         overflowY: "auto",
//         paddingBottom: "80px",
//       }}
//     >
//       {/* Header */}
//       <Header
//         style={{
//           background: "#001529",
//           padding: "0 24px",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <Title level={3} style={{ color: "#fff", margin: 0 }}>
//           📞 Help & Support
//         </Title>
//       </Header>

//       {/* Content aligned left */}
//       <Content
//         style={{
//           padding: "40px 20px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column", // ensures vertical stacking
//           minHeight: "calc(100vh - 64px)", // header height excluded
//         }}
//       >
//         <div style={{ width: "100%", maxWidth: 900 ,paddingTop: "10px" }}>
//           <Button
//             icon={<ArrowLeftOutlined />}
//             type="link"
//             onClick={() => navigate("/")}
//             style={{ marginBottom: 20 }}
//           >
//             Back to Home
//           </Button>

//           <Card
//             title={
//               <Title level={3} style={{ margin: 0 }}>
//                 📝 Contact Support
//               </Title>
//             }
//             bordered={false}
//             style={{
//               borderRadius: 16,
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//               background: "#ffffff",
//             }}
//           >
//             <Text
//               type="secondary"
//               style={{ display: "block", marginBottom: 24 }}
//             >
//               Have questions or facing issues? We're here to help.
//             </Text>

//             <Form layout="vertical" onFinish={onFinish}>
//               <Form.Item
//                 label="Your Email"
//                 name="email"
//                 rules={[
//                   { required: true, message: "Please enter your email" },
//                   { type: "email", message: "Invalid email format" },
//                 ]}
//               >
//                 <Input
//                   prefix={<MailOutlined />}
//                   placeholder="example@email.com"
//                   size="large"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Message"
//                 name="message"
//                 rules={[{ required: true, message: "Please enter your message" }]}
//               >
//                 <Input.TextArea
//                   rows={4}
//                   placeholder="Describe your issue or question..."
//                   size="large"
//                 />
//               </Form.Item>

//               <Form.Item>
//                 <Button
//                   type="primary"
//                   icon={<SendOutlined />}
//                   htmlType="submit"
//                   block
//                   size="large"
//                   style={{ borderRadius: 8 }}
//                 >
//                   Submit
//                 </Button>
//               </Form.Item>
//             </Form>

//             <div style={{ marginTop: 24 }}>
//               <Text type="secondary">
//                 Or contact us directly:<br />
//                 <MailOutlined /> support@healthcare.com<br />
//                 <PhoneOutlined /> +91-9876543210
//               </Text>
//             </div>
//           </Card>
//         </div>
//       </Content>

//       {/* Modal */}
//       <Modal
//         open={modalVisible}
//         centered
//         footer={null}
//         closable={false}
//         onCancel={() => {
//           setModalVisible(false);
//           navigate("/");
//         }}
//         bodyStyle={{ textAlign: "center", padding: "40px" }}
//       >
//         <img
//           src="https://img.icons8.com/fluency/96/checked.png"
//           alt="success"
//           style={{ marginBottom: 20 }}
//         />
//         <Title level={3}>Thanks for reaching out!</Title>
//         <Text>
//           We’ve received your message. Our support team will get back to you shortly.
//         </Text>
//         <Button
//           type="primary"
//           onClick={() => {
//             setModalVisible(false);
//             navigate("/");
//           }}
//           style={{ marginTop: 24 }}
//         >
//           Go to Home
//         </Button>
//       </Modal>
//     </Layout>
//   );
// };

// export default Support;


import React, { useState } from "react";
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Modal,
  message,
} from "antd";
import {
  SendOutlined,
  MailOutlined,
  PhoneOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const { Title, Text } = Typography;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        paddingBottom: "60px",
      }}
    >
      <div style={{ maxWidth: "1350px", margin: "0 auto", padding: "0 16px" }}>
        {/* Header - Left Aligned */}
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
            borderRadius: 10,
            color: "#fff",
            marginTop: 20,
            marginBottom: 20,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            textAlign: "left",
          }}
        >
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            📞 Help & Support
          </Title>
          <Text style={{ color: "#e6f7ff" }}>
            Reach out to us for assistance or queries.
          </Text>
        </motion.div>

        {/* Back Button - Left Aligned */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ marginBottom: 20, textAlign: "left" }}
        >
          <Button
            icon={<ArrowLeftOutlined />}
            type="link"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </motion.div>

        {/* Support Form Card - Centered Content */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card
            bordered={false}
            style={{
              background: "#ffffff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Title level={4}>📝 Contact Support</Title>
              <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
                Have a question or issue? Fill out the form below.
              </Text>
            </div>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={<div style={{ textAlign: "center" }}>Your Email</div>}
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
                label={<div style={{ textAlign: "center" }}>Message</div>}
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

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <Text type="secondary">
                Or contact us directly:<br />
                <MailOutlined /> support@healthcare.com<br />
                <PhoneOutlined /> +91-9876543210
              </Text>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Success Modal */}
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
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
        </motion.div>
      </Modal>
    </div>
  );
};

export default Support;
