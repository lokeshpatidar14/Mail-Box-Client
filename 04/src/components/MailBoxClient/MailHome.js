import React from "react";
import { useNavigate } from "react-router-dom";

function MailHome() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div>
      <h1>Welcome, {userEmail}</h1>
      <nav>
        <button onClick={() => navigate("/compose")}>Compose Mail</button>
        <button onClick={() => navigate("/inbox")}>Inbox</button>
        <button onClick={() => navigate("/sent")}>Sent Mail</button>
      </nav>
    </div>
  );
}

export default MailHome;
