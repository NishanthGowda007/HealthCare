# 🏥 HealthCare App

A full-stack Healthcare Appointment and Wellness Management System with role-based login for Doctors and Patients. Built using **React.js (Vite)**, **Firebase**, and **Node.js/Express**.

---

## 🚀 Features

### 👨‍⚕️ Doctor Module
- Login using **Email or Name + Password**
- View all appointments (Pending / Confirmed / Rejected)
- Accept or reject appointment requests
- Auto-email to patients on confirmation or rejection

### 🧑‍⚕️ Patient Module
- Register and login using Email + Password
- Book appointments with available doctors
- View appointment status in real-time
- Auto-email on updates

### 📅 Additional Modules
- **Events**: View upcoming health awareness campaigns (Yoga Day, World Health Day, etc.)
- **Wellness Zone**: Self-care guides, Yoga routines, and Mental Health tips
- **Support**: Contact help center for app-related queries

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js + Vite
- Ant Design (UI Framework)
- React Router
- Firebase Auth & Firestore

### Backend
- Node.js + Express
- Firebase Admin SDK
- Nodemailer (for email notifications)

---

## 📂 Folder Structure

```txt
📁 Backend/
├── index.js
├── sendEmail.js
└── package.json

📁 frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── DoctorDashboard.jsx
│   │   ├── PatientDashboard.jsx
│   │   ├── DoctorOverview.jsx
│   │   ├── Event.jsx
│   │   ├── Wellness.jsx
│   │   └── Support.jsx
│   └── firebase.js
├── .env.example
└── vite.config.js
