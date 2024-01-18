import React, { useState } from "react";


const copyIconSVG = (
  <svg
    viewBox="0 0 1024 1024"
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    width="36px"
    height="36px"
  >
    <g id="SVGRepo_iconCarrier">
      <path
        d="M589.3 260.9v30H371.4v-30H268.9v513h117.2v-304l109.7-99.1h202.1V260.9z"
        fill="#E1F0FF"
      />
      <path
        d="M516.1 371.1l-122.9 99.8v346.8h370.4V371.1z"
        fill="#E1F0FF"
      />
      <path d="M752.7 370.8h21.8v435.8h-21.8z" fill="#446EB1" />
      <path d="M495.8 370.8h277.3v21.8H495.8z" fill="#446EB1" />
      <path d="M495.8 370.8h21.8v124.3h-21.8z" fill="#446EB1" />
      <path d="M397.7 488.7l-15.4-15.4 113.5-102.5 15.4 15.4z" fill="#446EB1" />
      <path d="M382.3 473.3h135.3v21.8H382.3z" fill="#446EB1" />
      <path d="M382.3 479.7h21.8v348.6h-21.8zM404.1 806.6h370.4v21.8H404.1z" fill="#446EB1" />
      <path d="M447.7 545.1h261.5v21.8H447.7zM447.7 610.5h261.5v21.8H447.7zM447.7 675.8h261.5v21.8H447.7z" fill="#6D9EE8" />
      <path d="M251.6 763h130.7v21.8H251.6z" fill="#446EB1" />
      <path d="M251.6 240.1h21.8v544.7h-21.8zM687.3 240.1h21.8v130.7h-21.8zM273.4 240.1h108.9v21.8H273.4z" fill="#446EB1" />
      <path d="M578.4 240.1h130.7v21.8H578.4zM360.5 196.5h21.8v108.9h-21.8zM382.3 283.7h196.1v21.8H382.3zM534.8 196.5h65.4v21.8h-65.4z" fill="#446EB1" />
      <path d="M360.5 196.5h65.4v21.8h-65.4zM404.1 174.7h152.5v21.8H404.1zM578.4 196.5h21.8v108.9h-21.8z" fill="#446EB1" />
    </g>
  </svg>
);

const PromptCard = ({ title, description, category }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    // Create a temporary textarea element to copy text to clipboard
    const textarea = document.createElement("textarea");
    textarea.value = description;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    // Set copied to true and reset it after a few seconds
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl mb-2">{title}</div>
          {/* Copy Text button */}
          <button
            onClick={handleCopyText}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {copied ? "Copied!" : copyIconSVG}
            
          </button>
        </div>
        {/* {copied && (
          <div className="text-green-500 text-sm mt-2">
            Text copied to clipboard!
          </div>
        )} */}
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
