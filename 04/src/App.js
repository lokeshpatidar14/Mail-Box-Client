import React from "react";

// import Router from "./components/Router";
import NavbarMain from "./components/NavbarMain";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./components/MailBoxClient/LoginRegister";
import MailHome from "./components/MailBoxClient/MailHome";
import ComposeMail from "./components/MailBoxClient/ComposeMail";
import Inbox from "./components/MailBoxClient/Inbox";
import SentMail from "./components/MailBoxClient/SentMail";

function App() {
  // return (
  //   <div className="container">
  //
  //     <Router />
  //   </div>
  // );

  return (
    <div className="container">
      <NavbarMain />
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/home" element={<MailHome />} />
        <Route path="/compose" element={<ComposeMail />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/sent" element={<SentMail />} />
      </Routes>
    </div>
  );
}

export default App;
