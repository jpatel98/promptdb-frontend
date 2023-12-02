import React from "react";

const PromptCard = ({ title, description, category }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        {category && (
          <span className="inline-flex items-center rounded-md bg-gray-50 my-2 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {category}
          </span>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
