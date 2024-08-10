import React from "react";

import Router from "./components/Router";
import NavbarMain from "./components/NavbarMain"

function App() {
  return (
    <div className="container">
      <NavbarMain />
      <Router />
    </div>
  );
}

export default App;
