import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

 function Mainpage(){
    return(
        <div>
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <Routes>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
            </Routes>
        </div>
    );
 }export default Mainpage;