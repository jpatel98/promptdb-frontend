import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-gray-800 text-white text-center p-12">
      <h1 className="text-5xl font-bold mb-4">Welcome to PromptDB</h1>
      <p className="text-xl mb-8">
        Explore and contribute to a diverse collection of AI prompts.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View All Prompts
      </button>
    </div>
  );
};

export default HeroSection;
