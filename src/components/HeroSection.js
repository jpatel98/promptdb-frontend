import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const goToPromptList = () => {
    navigate("/promptList");
  };
  return (
    <div className="bg-gray-800 text-white text-center p-12">
      <h1 className="text-5xl font-bold mb-4">Welcome to PromptDB</h1>
      <p className="text-xl mb-8">
        Explore and contribute to a diverse collection of AI prompts.
      </p>
      <button onClick={goToPromptList} className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
        View All Prompts
      </button>
    </div>
  );
};

export default HeroSection;
