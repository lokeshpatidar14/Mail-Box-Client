import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  // const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  const isloggedIn = true;

  return (
    <Nav>
      <Nav.Link as={NavLink} to="/mail">
        MailBox
      </Nav.Link>
    </Nav>
  );
};

export default Home;
