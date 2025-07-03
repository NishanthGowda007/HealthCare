# 🏥 HealthCare App

A full-stack Healthcare Appointment and Wellness Management System with role-based login for Doctors and Patients. Built using **React.js (Vite)**, **Firebase**, and **Node.js/Express**.

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

## 📂 Folder Structure

📁 Backend/
├── index.js
├── sendEmail.js
└── package.json

📁 frontend/
├── src/
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── DoctorDashboard.jsx
│ │ ├── PatientDashboard.jsx
│ │ ├── DoctorOverview.jsx
│ │ ├── Event.jsx
│ │ ├── Wellness.jsx
│ │ └── Support.jsx
│ └── firebase.js
└── vite.config.js

## 🔐 Role-Based Login

- Doctor & Patient login UI in a single screen (separated by boxes)
- Prevents patients from accessing doctor panel and vice versa
- Custom message: _"Invalid credentials for this role"_ when misused

## 📧 Email Notification System

Integrated via backend (Nodemailer) for:
- Appointment Confirmation
- Appointment Rejection with rebooking link

## 🛠️ Getting Started

### 🔧 Prerequisites
- Node.js & npm
- Firebase project (with Authentication + Firestore)

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/healthcare-app.git
cd healthcare-app
```

### 2. Backend Setup

cd Backend
npm install
node index.js
### 3. Frontend Setup
cd frontend
npm install
npm run dev
### 4. Environment Variables
Create a .env file in frontend/ with:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...

### 📷 Screenshots
Coming soon: Login page, dashboard views, appointment cards

### 🤝 Contributing
Feel free to fork the repo and submit PRs! Bug reports, feature requests, and improvements are always welcome.

### 📃 License
MIT License © 2025 Nishanth Gowda

