import React, { useEffect, useState } from "react";
import axios from "axios";

function Inbox() {
  const [emails, setEmails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          "https://mailboxclient-e0122-default-rtdb.firebaseio.com/mails.json"
        );
        const fetchedEmails = Object.values(response.data || {}).filter(
          (mail) => mail.to === userEmail
        );
        setEmails(fetchedEmails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [userEmail]);

  return (
    <div>
      <h2>Inbox</h2>
      {emails.length > 0 ? (
        emails.map((mail, index) => (
          <div key={index}>
            <p>
              <strong>From:</strong> {mail.from}
            </p>
            <p>
              <strong>Subject:</strong> {mail.subject}
            </p>
            <div dangerouslySetInnerHTML={{ __html: mail.content }} />
            <hr />
          </div>
        ))
      ) : (
        <p>No emails received.</p>
      )}
    </div>
  );
}

export default Inbox;
