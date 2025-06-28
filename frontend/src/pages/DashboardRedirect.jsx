import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const DashboardRedirect = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const role = docSnap.data()?.role;
        if (role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/patient-dashboard");
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}>
      <Spin tip="Redirecting..." size="large" />
    </div>
  );
};

export default DashboardRedirect;
