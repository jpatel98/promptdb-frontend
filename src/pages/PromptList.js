import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import PromptCard from '../components/PromptCard';

const PromptList = () => {
  const [prompts, setPrompts] = useState([]);
  const [loginRequired, setLoginRequired] = useState(false); // State to track if login is required
  const [loggedIn, setLoggedIn] = useState(false); // State to track if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    const fetchPrompts = async () => {
      try {
        if (!token) {
          // Set loginRequired to true if token is missing
          setLoginRequired(true);
          return;
        }

        const response = await api.get('/api/prompts/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPrompts(response.data);
      } catch (error) {
        console.error('Error fetching prompts', error);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <div className="container mx-auto mt-16 px-4 pt-12">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">All Prompts</h1>
        {/* Conditionally render the "Add Prompt" button */}
        {loggedIn && (
          <button
            onClick={() => {
              // Navigate to the add prompt page
              navigate('/addPrompt');
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Prompt
          </button>
        )}
      </div>
      {loginRequired ? (
        <div className="text-red-500 text-center">
          You need to login to access all prompts
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              title={prompt.title}
              description={prompt.description}
              category={prompt.category}
            />
          ))}
        </div>
      )}
      {loginRequired && !loggedIn && (
        <div className="text-center">
          <button
            onClick={() => {
              navigate('/login');
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptList;
