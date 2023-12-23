import React, { useState, useEffect } from "react";
import api from "../utils/api";

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserDetails(response.data);
      } catch (err) {
        setError("Failed to fetch user details");
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!userDetails) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <img
        src={userDetails.userImage}
        alt="User"
        className="max-w-xs rounded-full mb-4"
      />
      <div className="bg-white shadow-md rounded px-4 py-2 text-left">
        <h1 className="text-xl font-bold mb-2 text-center">{userDetails.username}</h1>
        <div className="flex flex-col items-start">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
          <p><strong>Account Created:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;

