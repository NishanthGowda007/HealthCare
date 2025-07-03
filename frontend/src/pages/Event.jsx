// import React from "react";
// import { Typography, Timeline, Card } from "antd";
// import { CalendarOutlined } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const events = [
//   {
//     title: "World Health Day",
//     date: "April 7, 2025",
//     description: "Raising awareness on important health topics by WHO.",
//   },
//   {
//     title: "No Tobacco Day",
//     date: "May 31, 2025",
//     description: "Global initiative to reduce tobacco use.",
//   },
//   {
//     title: "International Yoga Day",
//     date: "June 21, 2025",
//     description: "Promotes healthy lifestyle through yoga.",
//   },
//   {
//     title: "World Mental Health Day",
//     date: "October 10, 2025",
//     description: "Aims to raise awareness about mental well-being.",
//   },
// ];

// const Events = () => {
//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         overflowY: "auto",
//         backgroundColor: "#ffffff",
//         paddingBottom: "60px",
//       }}
//     >
//       <div style={{ maxWidth: "2100px", margin: "0 auto" }}>
//         {/* Header */}
//         <div style={{ background: "#002c47", padding: "16px 24px" }}>
//           <Title level={3} style={{ color: "#fff", margin: 0 }}>
//             <CalendarOutlined style={{ marginRight: 10 }} />
//             Health Calendar & Awareness Drives
//           </Title>
//         </div>

//         {/* Content */}
//         <div style={{ padding: 20 }}>
//           <div style={{ marginBottom: 30 }}>
//             <Title level={2} style={{ color: "#002c47", fontWeight: "bold" }}>
//               Upcoming Global Health Events
//             </Title>
//             <Text type="secondary" style={{ fontSize: 16 }}>
//               Stay informed about important days dedicated to health and well-being.
//             </Text>
//           </div>

//           <Timeline mode="left">
//             {events.map((event, index) => (
//               <Timeline.Item label={event.date} key={index}>
//                 <Card
//                   style={{
//                     backgroundColor: "#e6f7ff",
//                     borderRadius: 12,
//                     padding: "16px",
//                     boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
//                   }}
//                   hoverable
//                 >
//                   <Title level={4} style={{ margin: 0 }}>
//                     {event.title}
//                   </Title>
//                   <Text type="secondary">{event.description}</Text>
//                 </Card>
//               </Timeline.Item>
//             ))}
//           </Timeline>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;

import React from "react";
import { Typography, Timeline, Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const events = [
  {
    title: "World Health Day",
    date: "April 7, 2025",
    description: "Raising awareness on important health topics by WHO.",
  },
  {
    title: "No Tobacco Day",
    date: "May 31, 2025",
    description: "Global initiative to reduce tobacco use.",
  },
  {
    title: "International Yoga Day",
    date: "June 21, 2025",
    description: "Promotes healthy lifestyle through yoga.",
  },
  {
    title: "World Mental Health Day",
    date: "October 10, 2025",
    description: "Aims to raise awareness about mental well-being.",
  },
  {
    title: "World AIDS Day",
    date: "December 1, 2025",
    description: "Dedicated to raising awareness of the AIDS pandemic.",
  },
  {
    title: "World Diabetes Day",
    date: "November 14, 2025",
    description: "Promotes global awareness of diabetes and its impact.",
  },
  {
    title: "World Blood Donor Day",
    date: "June 14, 2025",
    description: "Thanks voluntary blood donors for saving lives.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Events = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        paddingBottom: "60px",
      }}
    >
      <div style={{ maxWidth: "1350px", margin: "0 auto", padding: "0 16px" }}>
        {/* Header - Gradient */}
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
            color: "#fff",
            marginTop: 20,
            marginBottom: 40,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            textAlign: "left",
          }}
        >
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            <CalendarOutlined style={{ marginRight: 10 }} />
            🌐 Upcoming Global Health Events
          </Title>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ffffff",
            }}
          >
            Stay updated on key international health observances.
          </Text>
        </motion.div>

        {/* Timeline with animation */}
        <Timeline mode="left">
          {events.map((event, index) => (
            <Timeline.Item label={event.date} key={index}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card
                  style={{
                    backgroundColor: "#e6f7ff",
                    borderRadius: 12,
                    padding: "16px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                  }}
                  hoverable
                >
                  <Title level={4} style={{ margin: 0 }}>
                    {event.title}
                  </Title>
                  <Text type="secondary">{event.description}</Text>
                </Card>
              </motion.div>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default Events;
