import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <a href="/">PromptDB</a>
        </h1>
        <div>
          <a href="/" className="mr-4">
            PromptList
          </a>
          <a href="/login" className="mr-4">
            Login
          </a>
          <a href="/signup">Signup</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
