import React, { useEffect, useState } from "react";
import axios from "axios";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = localStorage.getItem("userEmail"); // Retrieve logged-in user's email
  const sanitizedUserEmail = userEmail.replace(/\./g, "_"); // Sanitize email to safely use in the URL

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails/${sanitizedUserEmail}/inbox.json`
        );

        if (response.data) {
          const emailsArray = Object.entries(response.data).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );
          setEmails(emailsArray);
        }
      } catch (error) {
        console.error(
          "Error fetching emails:",
          error.response?.data || error.message
        );
        alert("Failed to retrieve emails.");
      }
    };

    fetchEmails();
  }, [sanitizedUserEmail]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails/${sanitizedUserEmail}/inbox/${id}.json`
      );

      setEmails((prevEmails) => prevEmails.filter((email) => email.id !== id));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <div>
      <h2>Inbox</h2>
      {emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <ul>
          {emails.map((email) => (
            <li key={email.id}>
              <strong>From:</strong> {email.from} <br />
              <strong>Subject:</strong> {email.subject} <br />
              <strong>Body:</strong> {email.body} <br />
              <strong>Received at:</strong> {email.timestamp} <br />
              <button onClick={() => handleDelete(email.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;
