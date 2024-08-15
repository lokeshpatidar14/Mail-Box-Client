import React from "react";
import { Routes , Route } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home"
import Mail from "./Mails/Mail";
import ComposeMail from "./Mails/ComposeMail";
import Inbox from "./Mails/Inbox";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/compose" element={<ComposeMail />} />
        <Route path="/inbox" element={<Inbox />} />

      </Routes>
    </>
  );
};

export default Router; 
