// src/components/Mail.js
import React from "react";

import {  Navbar, Nav } from "react-bootstrap";

const Mail = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Mailbox Client</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/compose">Compose Mail</Nav.Link>
        <Nav.Link href="/inbox">Inbox</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Mail;
