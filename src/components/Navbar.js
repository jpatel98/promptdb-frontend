import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">PromptDB</Link>
        </h1>
        <div>
          <Link to="/" className="mr-4">
            PromptList
          </Link>
          <Link to="/login" className="mr-4">
            Login
          </Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
