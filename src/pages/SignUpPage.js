import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../utils/api";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // State for input field values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for validation messages
  const [validationMsg, setValidationMsg] = useState({
    username: "",
    email: "",
    password: "",
    serverError: "",
  });

  // Handle input field changes
  const handleChange = (e, type) => {
    const { value } = e.target;
    if (type === "username") setUsername(value);
    if (type === "email") setEmail(value);
    if (type === "password") setPassword(value);
  };

  // Function to check password complexity
  const isPasswordComplex = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    let isValid = true;
    let newValidationMsg = {
      username: "",
      email: "",
      password: "",
      serverError: "",
    };

    if (!username) {
      newValidationMsg.username = "Username is required";
      isValid = false;
    }
    if (!email) {
      newValidationMsg.email = "Email is required";
      isValid = false;
    }
    if (!password) {
      newValidationMsg.password = "Password is required";
      isValid = false;
    } else if (!isPasswordComplex(password)) {
      newValidationMsg.password =
        "Password must be at least 8 characters long, include uppercase letters and symbols";
      isValid = false;
    }

    setValidationMsg(newValidationMsg);
    if (isValid) {
      // Submit form data
      try {
        await api.post("/api/users/register", {
          username,
          email,
          password,
        });
        // console.log("Registration successful", response.data);
        // Redirect to login or dashboard page as needed
        // Automatically log the user in after successful registration
        const loginResponse = await api.post("/api/users/login", {
          email,
          password,
        });
        localStorage.setItem("token", loginResponse.data.token);
        localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
        setUser(loginResponse.data.user); // Update user in global state
        navigate("/promptList");
      } catch (error) {
        console.error("Registration error", error.response.data);
        // Update the serverError field in the state
        setValidationMsg((prevState) => ({
          ...prevState,
          serverError: error.response.data,
        }));
      }
    } else {
      // If the form is not valid, update the validation messages
      setValidationMsg(newValidationMsg);
    }
  };

  return (
    <div className="container mx-auto mt-16 px-4 py-12">
      <div className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => handleChange(e, "username")}
            />
            {validationMsg.username && (
              <p className="text-red-500 text-xs italic">
                {validationMsg.username}
              </p>
            )}
          </div>
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
              <p className="text-red-500 text-xs italic">
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
              <p className="text-red-500 text-xs italic">
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
              Sign Up
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Have an account? Log in.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
