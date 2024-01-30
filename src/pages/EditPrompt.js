import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";

const EditPrompt = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const prompt = location.state?.prompt;

    // Initialize state with existing data
    const [title, setTitle] = useState(prompt?.title || '');
    const [description, setDescription] = useState(prompt?.description || '');
    const [tags, setTags] = useState(prompt?.tags.join(', ') || '');

    // State for validation messages
    const [validationMsg, setValidationMsg] = useState({
        title: "",
        description: "",
        tags: "",
        serverError: "",
    });

    // Handle input field changes
    const handleChange = (e, type) => {
        const { value } = e.target;
        if (type === "title") setTitle(value);
        if (type === "description") setDescription(value);
        if (type === "tags") setTags(value);
    };

    // Handle form submission
    const handleSubmit = async () => {
        let isValid = true;
        let newValidationMsg = {
            title: "",
            description: "",
            tags: "",
            serverError: "",
        };

        if (!title) {
            newValidationMsg.title = "Title is required";
            isValid = false;
        }
        if (!description) {
            newValidationMsg.description = "Description is required";
            isValid = false;
        }
        if (!tags) {
            newValidationMsg.tags = "Tags are required";
            isValid = false;
        }

        setValidationMsg(newValidationMsg);
        if (isValid) {
            try {
              const token = localStorage.getItem("token");
              await api.put(
                `/api/prompts/edit/${prompt._id}`,
                {
                  title,
                  description,
                  tags: tags.split(",").map((tag) => tag.trim()), // Split tags by comma and trim whitespace
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              navigate(`/promptList`);
            } catch (error) {
              console.error("Edit Prompt error", error.response.data);
              setValidationMsg((prevState) => ({
                ...prevState,
                serverError: error.response.data,
              }));
            }
          }
    };

    return (
        <div className="container mx-auto mt-16 px-4 py-12">
            <div className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Prompt</h2>
                <form>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => handleChange(e, "title")}
                        />
                        {validationMsg.title && (
                            <p className="text-red-500 text-xs italic">
                                {validationMsg.title}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-30"
                            id="description"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => handleChange(e, "description")}
                        />
                        {validationMsg.description && (
                            <p className="text-red-500 text-xs italic">
                                {validationMsg.description}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="tags"
                        >
                            Tags (comma-separated)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="tags"
                            type="text"
                            placeholder="Tags"
                            value={tags}
                            onChange={(e) => handleChange(e, "tags")}
                        />
                        {validationMsg.tags && (
                            <p className="text-red-500 text-xs italic">
                                {validationMsg.tags}
                            </p>
                        )}
                    </div>
                    {validationMsg.serverError && (
                        <p className="text-red-500 text-center text-xs italic mb-4">
                            {validationMsg.serverError}
                        </p>
                    )}
                    <div className="flex items-center justify-center mt-6">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Edit Prompt
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPrompt;
