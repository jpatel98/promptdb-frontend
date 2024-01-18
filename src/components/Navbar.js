import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if click is outside of the user avatar and dropdown menu
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); // Clear user in global state
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">PromptDB</Link>
        </h1>
        <div className="flex items-center">
          <Link
            to="/promptList"
            className="mr-4 text-md px-3 bg-red-500 rounded hover:bg-blue-700"
          >
            PromptList
          </Link>

          {user ? (
            <div className="relative inline-block text-left">
              <div
                ref={avatarRef}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center cursor-pointer"
              >
                <img
                  src={user.userImage}
                  alt="Profile"
                  className="inline-block h-8 w-8 rounded-full align-middle"
                />
              </div>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm capitalize hover:bg-blue-800 text-gray-700 hover:bg-blue-500 hover:text-white"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left w-full px-4 py-2 text-sm capitalize hover:bg-red-800 text-gray-700 hover:bg-blue-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-lg">
                Login
              </Link>
              <Link to="/signup" className="text-lg">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
