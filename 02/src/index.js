import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Auth from "./components/Auth";
import store from "./redux-store/store";
import { Provider } from "react-redux";
import App from "./App";
// import SignUpPage from "./jupitech/SignUpPage";
// import Signup from "./jupitech/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
);
