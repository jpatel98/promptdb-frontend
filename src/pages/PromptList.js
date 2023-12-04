import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import PromptCard from '../components/PromptCard';

const PromptList = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await api.get('/api/prompts/all');
        setPrompts(response.data);
      } catch (error) {
        console.error('Error fetching prompts', error);
        // Handle error appropriately
      }
    };

    fetchPrompts();
  }, []);

  return (
    <div className="container mx-auto mt-16 px-4 pt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Prompts</h1>
      <div className="flex flex-wrap justify-center">
        {prompts.map((prompt) => (
          <PromptCard 
            key={prompt._id} // Assuming each prompt has a unique _id
            title={prompt.title}
            description={prompt.description}
            category={prompt.category}
          />
        ))}
      </div>
    </div>
  );
};

export default PromptList;
