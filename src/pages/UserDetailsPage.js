import React, { useState, useEffect } from "react";
import api from "../utils/api";

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userPrompts, setUserPrompts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch user details
        const userDetailsResponse = await api.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(userDetailsResponse.data);
        return userDetailsResponse.data._id; // Return the user ID
      } catch (err) {
        setError("Failed to fetch user details");
        console.error(err);
      }
    };

    const fetchUserPrompts = async (userId) => {
      try {
        const token = localStorage.getItem('token');
        // Fetch prompts for this user
        const promptsResponse = await api.get(`/api/prompts/getById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserPrompts(promptsResponse.data);
      } catch (err) {
        setError("Failed to fetch user prompts");
        console.error(err);
      }
    };

    fetchUserDetails().then(userId => {
      if (userId) {
        fetchUserPrompts(userId);
      }
    });
  }, []);


  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!userDetails) {
    return <div className="text-center">Loading...</div>;
  }

  // Section to display user prompts
  const userPromptsSection = userPrompts.length ? (
    <div className="my-15">
      <h2 className="text-2xl font-bold pt-15 my-4 text-center">My Prompts</h2>
      {userPrompts.map(prompt => (
        <div key={prompt._id} className="mb-4">
          <div className="p-2 bg-white shadow-md rounded mx-auto flex flex-col items-center">
            <h3 className="font-bold">{prompt.title}</h3>
            <p>{prompt.description}</p>
            {/* Render tags or other prompt details as needed */}
            <div className="flex justify-center mt-4">
              <button className="mx-2">
                {/* Edit Button SVG */}
                <svg className="mt-2" width="37" height="37" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG Path for Edit Icon */}
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  {/* Other Paths */}
                </svg>
              </button>
              <button className="mx-2">
                {/* Delete Button SVG */}
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG Path for Delete Icon */}
                  <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No prompts</p>
  );
  
  

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

      {userPromptsSection}
    </div>
  );
};

export default UserDetailsPage;

