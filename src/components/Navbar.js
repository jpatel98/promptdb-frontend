import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); // Clear user in global state
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">PromptDB</Link>
        </h1>
        <div>
          <Link to="/" className="mr-4">PromptList</Link>
          {user ? (
            <>
              <span className="mr-4">{user.username}</span>
              <img src={user.userImage} alt="Profile" className="inline-block h-8 w-8 rounded-full mr-4" />
              <button onClick={handleLogout} className="text-blue-200 hover:text-blue-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
