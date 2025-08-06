// const express = require("express");
// const cors = require("cors");
// const admin = require("firebase-admin");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const serviceAccount = require("E:/HealthCare/serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const db = admin.firestore();

// app.post("/appointments", async (req, res) => {
//   try {
//     const { doctorId, patientId, date, time, status } = req.body;

//     if (!doctorId || !patientId || !date || !time) {
//       return res.status(400).send("Missing fields");
//     }

//     const newAppointment = {
//       doctorId,
//       patientId,
//       date,
//       time,
//       status: status || "pending",
//     };

//     const docRef = await db.collection("appointments").add(newAppointment);
//     res.status(201).send({ id: docRef.id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error saving appointment");
//   }
// });


// app.get("/appointments/:doctorId", async (req, res) => {
//   const { doctorId } = req.params;
//   try {
//     const snapshot = await db
//       .collection("appointments")
//       .where("doctorId", "==", doctorId)
//       .get();
//     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.post("/appointments/:id/confirm", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await db.collection("appointments").doc(id).update({ status: "confirmed" });
//     res.status(200).send("Appointment confirmed");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
// app.post("/appointments/:id/reject", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await db.collection("appointments").doc(id).update({ status: "rejected" });
//     res.status(200).send("Appointment rejected");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// const sendEmailRoute = require("./sendEmail");
// app.use("/send-email", sendEmailRoute);


// app.listen(5000, () => console.log("Server running on port 5000"));

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // 🟢 Render
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // 🟡 Local
  const localPath = path.join(__dirname, "../serviceAccountKey.json");
  serviceAccount = require(localPath);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.post("/appointments", async (req, res) => {
  try {
    const { doctorId, patientId, date, time, status } = req.body;
    if (!doctorId || !patientId || !date || !time) {
      return res.status(400).send("Missing fields");
    }

    const newAppointment = {
      doctorId,
      patientId,
      date,
      time,
      status: status || "pending",
    };

    const docRef = await db.collection("appointments").add(newAppointment);
    res.status(201).send({ id: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving appointment");
  }
});

app.get("/appointments/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  try {
    const snapshot = await db
      .collection("appointments")
      .where("doctorId", "==", doctorId)
      .get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/appointments/:id/confirm", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("appointments").doc(id).update({ status: "confirmed" });
    res.status(200).send("Appointment confirmed");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/appointments/:id/reject", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("appointments").doc(id).update({ status: "rejected" });
    res.status(200).send("Appointment rejected");
  } catch (err) {
    res.status(500).send(err);
  }
});

// 🔁 Include email route if used
const sendEmailRoute = require("./sendEmail");
app.use("/send-email", sendEmailRoute);

// ✅ Support Render dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
