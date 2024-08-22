import React, { useState } from "react";
import useSendEmail from "./hooks/useSendEmail";

const ComposeMail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const senderEmail = localStorage.getItem("userEmail").replace(/\./g, "_");

  const sendEmail = useSendEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailData = {
      from: senderEmail,
      to,
      subject,
      body,
      timestamp: new Date().toISOString(),
    };

    const receiverPath = `https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails/${to.replace(/\./g, "_")}/inbox`;
    const senderPath = `https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails/${senderEmail}/sent`;

    sendEmail(receiverPath, senderPath, emailData, () => {
      alert("Email sent successfully!");
      setTo("");
      setSubject("");
      setBody("");
    });
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
