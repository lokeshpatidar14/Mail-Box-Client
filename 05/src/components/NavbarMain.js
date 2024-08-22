import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function NavbarMain() {
  const isloggedIn = useSelector((state) => state.auth.isloggedIn);

  return (
    <Nav>
      <Nav.Link as={NavLink} to="/login">
        Login
      </Nav.Link>
      {/* <Nav.Link as={NavLink} to="/register">
        Register
      </Nav.Link> */}
      <Nav.Link as={NavLink} to="/home">
        Home
      </Nav.Link>
    </Nav>
  );
}
export default NavbarMain;
