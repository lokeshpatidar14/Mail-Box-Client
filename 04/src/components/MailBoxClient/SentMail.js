import React, { useEffect, useState } from "react";
import axios from "axios";

function SentMail() {
  const [emails, setEmails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const sanitizedUserEmail = userEmail.replace(/\./g, "_");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails/${sanitizedUserEmail}/sent.json`
        );

        if (response.data) {
          const sentEmails = Object.entries(response.data).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );
          setEmails(sentEmails);
        } else {
          setEmails([]);
        }
      } catch (error) {
        console.error("Error fetching sent emails:", error);
      }
    };

    fetchEmails();
  }, [sanitizedUserEmail]);

  return (
    <div>
      <h2>Sent Mail</h2>
      {emails.length > 0 ? (
        emails.map((mail) => (
          <div key={mail.id}>
            <p>
              <strong>To:</strong> {mail.to}
            </p>
            <p>
              <strong>Subject:</strong> {mail.subject}
            </p>
            <div>{mail.body}</div>
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
