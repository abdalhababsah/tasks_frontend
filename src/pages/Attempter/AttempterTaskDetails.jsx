import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TasksLayout from "../../components/TaskDetailsLayouts/TasksLayout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const AttempterTaskDetails = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const navigate = useNavigate();

  const languageOptions = ["Python", "JavaScript", "Java", "csharp", "Swift", "Go"];
  const taskCategoryOptions = ["Tourism", "Sports", "Games"];

  const wordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const validateInputs = () => {
    let errors = [];
    if (!prompt.trim()) {
      errors.push("- Prompt is required.");
    } else if (wordCount(prompt) < 100) {
      errors.push("- Prompt must be at least 100 words.");
    }
    if (!response.trim()) {
      errors.push("- Response is required.");
    } else if (wordCount(response) < 100) {
      errors.push("- Response must be at least 100 words.");
    }
    if (!language) {
      errors.push("- Language is required.");
    }
    if (!taskCategory) {
      errors.push("- Task Category is required.");
    }

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Errors",
        html: `<ul>${errors.map((error) => `<li>${error}</li>`).join("")}</ul>`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
      });
      return false;
    }
    return true;
  };
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL; 
  const handleSubmit = async () => {
    if (!validateInputs()) return;
    try {
   
      const res = await fetch(`${BASE_URL}/api/tasks/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt,
          response,
          language: language.toLowerCase(),
          category: taskCategory.toLowerCase(),
        }),
      });
      if (res.ok) {
        console.log("Task submitted successfully!");
        navigate("/submitted");
      } else {
        console.error("Failed to submit task");
      }
    } catch (error) {
      console.error("An error occurred while submitting the task", error);
    }
  };

  return (
    <TasksLayout handleSubmit={handleSubmit}>
       <div className="p-4 md:ml-64 justify-center flex lg:ml-64 xl:ml-64 h-auto pt-20">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl p-5 mb-8 m-10">
          <div className="mb-6">
            <h2 className="mb-2 text-lg dark:text-gray-400 font-semibold">
              Prompt
              <span className="text-sm text-red-500"> (At least 100 words)</span>
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Add Your Prompt Here..."
              className="w-full h-32 border  p-2 dark:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 p-4 bg-gray-100  overflow-x-auto">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="overflow-x-auto">
                        <SyntaxHighlighter
                          style={atomDark}
                          showLineNumbers={true}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {prompt}
              </ReactMarkdown>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg dark:text-gray-400 font-semibold">
              Response
              <span className="text-sm text-red-500"> (At least 100 words)</span>
            </h2>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Add Your Response Here..."
              className="w-full h-32 border  p-2 dark:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 p-4 bg-gray-100  overflow-x-auto">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="overflow-x-auto">
                        <SyntaxHighlighter
                          style={atomDark}
                          showLineNumbers={true}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block mb-2 dark:text-gray-400 font-semibold">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full px-2 py-2 border dark:bg-gray-300 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a language
                </option>
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block mb-2 dark:text-gray-400 font-semibold">Task Category</label>
              <select
                value={taskCategory}
                onChange={(e) => setTaskCategory(e.target.value)}
                className="block w-full px-2 py-2 border dark:bg-gray-300 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a task category
                </option>
                {taskCategoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </TasksLayout>
  );
};

export default AttempterTaskDetails;
