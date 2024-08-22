import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiKey = "AIzaSyA7SaJ8FJa_YmvEYSxxyZQEo-9eYSXfLOw";

function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    try {
      const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      if (response.status === 200) {
        localStorage.setItem("userEmail", email);
        if (isLogin) {
          alert("Welcome to your mailbox.");
        } else {
          alert("User has successfully signed up.");
        }
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <button type="button" onClick={handleToggle}>
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginRegister;
