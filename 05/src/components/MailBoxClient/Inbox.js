import React from "react";
import useFetchEmails from "./hooks/useFetchEmails";
import useDeleteEmail from "./hooks/useDeleteEmail";

const Inbox = () => {
  const userEmail = localStorage.getItem("userEmail").replace(/\./g, "_");
  const inboxPath = `https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails/${userEmail}/inbox.json`;

  const { emails, setEmails } = useFetchEmails(inboxPath);
  const deleteEmail = useDeleteEmail(inboxPath);

  const handleDelete = (id) => {
    deleteEmail(id, setEmails);
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
