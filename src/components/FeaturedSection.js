import React from "react";
import PromptCard from "./PromptCard";

const FeaturedSection = () => {
  const featuredPrompts = [
    {
      title: "Prompt One",
      description: "This is a featured prompt.",
      category: "category1",
      tags: ["tag1", "tag2", "tag3"],
      featured: true,
    },
    {
      id: 2,
      title: "Prompt Two",
      description: "This is a featured prompt.",
      category: "category2",
      tags: ["tag1", "tag2", "tag3"],
      featured: true,
    }
  ];

  return (
    <div className="container mx-auto py-6 ">
      <h2 className="text-2xl font-bold mb-2 px-2">Featured Prompts</h2>
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
