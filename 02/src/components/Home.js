import React from "react";
import { useSelector } from "react-redux";
import Mail from "./Mails/Mail";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  // const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  const isloggedIn = true

  return (
    <Nav>
      {isloggedIn && " Welcome to Mail Box Client"}
      {/* {isloggedIn && <Mail />} */}
      {isloggedIn && (
        <Nav.Link as={NavLink} to="/mail">
        MailBox
        </Nav.Link>
      )}
    </Nav>
  );
};

export default Home;
