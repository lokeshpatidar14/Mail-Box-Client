import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Form, Container } from "react-bootstrap";

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");

  const handleSendMail = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const email = {
      to,
      subject,
      content: rawContent,
      timestamp: Date.now(),
    };

    try {
      await fetch(
        "https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }
      );
      console.log("Email sent successfully");
      setTo("");
      setSubject("");
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  };

  return (
    <Container className="my-4">
      <h2>Compose Mail</h2>
      <Form>
        <Form.Group controlId="formTo">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="email"
            placeholder="Recipient's email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={(state) => setEditorState(state)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSendMail}>
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default ComposeMail;
