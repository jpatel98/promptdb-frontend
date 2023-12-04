import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import api from "../utils/api";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // State for input field values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for validation messages
  const [validationMsg, setValidationMsg] = useState({
    email: "",
    password: "",
    serverError: "", // Add a field for server-side error messages
  });

  // Handle input field changes
  const handleChange = (e, type) => {
    const { value } = e.target;
    if (type === "email") setEmail(value);
    if (type === "password") setPassword(value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    let isValid = true;
    let newValidationMsg = { email: "", password: "", serverError: "" };

    if (!email) {
      newValidationMsg.email = "Email is required";
      isValid = false;
    }
    if (!password) {
      newValidationMsg.password = "Password is required";
      isValid = false;
    }

    if (isValid) {
      try {
        let response = await api.post("/api/users/login", {
          email,
          password,
        });
        // console.log("Login successful", response.data);
        // Store the token and user details in localStorage
        localStorage.setItem("token", response.data.token);
        // Optionally, store user details (if returned by the API)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user); // Update user in global state
        // Redirect to /promptList
        navigate("/promptList");
      } catch (error) {
        console.error("Login error", error.response);
        // Assuming the server sends an error message in error.response.data.message
        const errorMessage =
          error.response && error.response.data
            ? error.response.data
            : "An unknown error occurred";
        setValidationMsg({ ...newValidationMsg, serverError: errorMessage });
      }
    } else {
      setValidationMsg(newValidationMsg);
    }
  };

  return (
    <div className="container mx-auto mt-16 px-4 pt-12">
      <div className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange(e, "email")}
            />
            {validationMsg.email && (
              <p className="text-red-500 text-xs italic pt-2">
                {validationMsg.email}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e, "password")}
            />
            {validationMsg.password && (
              <p className="text-red-500 text-xs italic pb-1">
                {validationMsg.password}
              </p>
            )}
            {validationMsg.serverError && (
              <p className="text-red-500 text-center text-xs italic mb-4">
                {validationMsg.serverError}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Don't have an account? Sign up.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
