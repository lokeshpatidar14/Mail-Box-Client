import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ComposeMail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const handleSend = async () => {
    const mailContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    const emailData = {
      from: userEmail,
      to,
      subject,
      content: mailContent,
    };

    try {
      await axios.post(
        "https://mailboxclient-e0122-default-rtdb.firebaseio.com/mails.json",
        emailData
      );
      alert("Mail sent successfully!");
      navigate("/sent");
    } catch (error) {
      console.error("Error sending mail:", error);
      alert("Failed to send mail.");
    }
  };

  return (
    <div>
      <h2>Compose Mail</h2>
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
        />
      </div>
      <div>
        <label>Message:</label>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
        />
      </div>
      <button onClick={handleSend}>Send Mail</button>
    </div>
  );
}

export default ComposeMail;
