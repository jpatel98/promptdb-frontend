import React from "react";
import PromptCard from "./PromptCard";

const FeaturedSection = () => {
  const featuredPrompts = [
    {
      id: 1,
      title: "Prompt One",
      description: "This is a featured prompt.",
      category: "category1",
    },
    {
      id: 2,
      title: "Prompt Two",
      description: "This is a featured prompt.",
      category: "category2",
    },
    {
      id: 3,
      title: "Prompt Three",
      description: "This is a featured prompt.",
      category: "category3",
    },
    {
      id: 4,
      title: "Prompt Four",
      description: "This is a featured prompt.",
      category: "category4",
    },
    {
      id: 5,
      title: "Prompt Five",
      description: "This is a featured prompt.",
      category: "category5",
    },
    {
      id: 6,
      title: "Prompt Six",
      description: "This is a featured prompt.",
      category: "category6",
    },
  ];

  return (
    <div className="container mx-auto py-6 ">
      <h2 className="text-2xl font-bold mb-2">Featured Prompts</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {featuredPrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
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
