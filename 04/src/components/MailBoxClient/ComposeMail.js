import React, { useState } from "react";
import axios from "axios";

const ComposeMail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const senderEmail = localStorage.getItem("userEmail"); // Sender's email stored during login

  const sanitizeEmail = (email) => email.replace(/\./g, '_');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const sanitizedTo = sanitizeEmail(to);
    const sanitizedSenderEmail = sanitizeEmail(senderEmail);
  
    const emailData = {
      from: senderEmail,
      subject,
      body,
      timestamp: new Date().toISOString(),
    };
  
    try {
      // Store email in the receiver's inbox
      await axios.post(
        `https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails/${sanitizedTo}/inbox.json`,
        emailData
      );
  
      // Store email in the sender's sent box
      await axios.post(
        `https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails/${sanitizedSenderEmail}/sent.json`,
        { ...emailData, to }
      );
  
      alert("Email sent successfully!");
      setTo("");
      setSubject("");
      setBody("");
    } catch (error) {
      console.error("Error sending email:", error.response?.data || error.message);
      alert("Failed to send email.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>To:</label>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default ComposeMail;
