import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import PromptCard from './PromptCard';

const FeaturedSection = () => {
  const [featuredPrompts, setFeaturedPrompts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPrompts = async () => {
      try {
        const response = await api.get('/api/prompts/featured');
        setFeaturedPrompts(response.data);
      } catch (error) {
        console.error('Error fetching featured prompts', error);
        // Handle error appropriately
      }
    };

    fetchFeaturedPrompts();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-2">Featured Prompts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredPrompts.map((prompt) => (
          <PromptCard 
            key={prompt._id}
            title={prompt.title}
            description={prompt.description}
            category={prompt.category}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
