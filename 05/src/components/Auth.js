import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { authActions } from "../redux-store/authSlice";

const apiKey = "AIzaSyA7SaJ8FJa_YmvEYSxxyZQEo-9eYSXfLOw"; // Correct API key

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      setStatus("Login Successful");
      dispatch(
        authActions.login({
          token: response.data.idToken,
          userId: response.data.localId,
        })
      );
      console.log(response.data); // You can handle the token or user info here
      navigate("/home"); // Redirect to the home page
    } catch (err) {
      setError("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      setStatus("User has successfully signed up");
      console.log(response.data); // You can handle the token or user info here
    } catch (err) {
      setError("Failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <Form
        onSubmit={isRegister ? handleRegister : handleLogin}
        style={{ width: "300px" }}>
        <h3>{isRegister ? "Register" : "Login"}</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {status && <Alert variant="warning">{status}</Alert>}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {isRegister && (
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        )}

        {isLoading ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : (
          <Button variant="primary" type="submit" className="w-100 mt-3">
            {isRegister ? "Register" : "Login"}
          </Button>
        )}

        <Button
          variant="link"
          className="w-100 mt-2"
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}>
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Form>
    </div>
  );
}

export default Auth;
