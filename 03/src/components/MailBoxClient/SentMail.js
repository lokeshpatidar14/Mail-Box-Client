import React, { useEffect, useState } from "react";
import axios from "axios";

function SentMail() {
  const [emails, setEmails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          "https://mailboxclient-e0122-default-rtdb.firebaseio.com/mails.json"
        );
        const sentEmails = Object.values(response.data || {}).filter(
          (mail) => mail.from === userEmail
        );
        setEmails(sentEmails);
      } catch (error) {
        console.error("Error fetching sent emails:", error);
      }
    };

    fetchEmails();
  }, [userEmail]);

  return (
    <div>
      <h2>Sent Mail</h2>
      {emails.length > 0 ? (
        emails.map((mail, index) => (
          <div key={index}>
            <p>
              <strong>To:</strong> {mail.to}
            </p>
            <p>
              <strong>Subject:</strong> {mail.subject}
            </p>
            <div dangerouslySetInnerHTML={{ __html: mail.content }} />
            <hr />
          </div>
        ))
      ) : (
        <p>No sent emails.</p>
      )}
    </div>
  );
}

export default SentMail;
