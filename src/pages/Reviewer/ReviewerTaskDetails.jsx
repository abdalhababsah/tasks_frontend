import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TasksLayout from "../../components/TaskDetailsLayouts/TasksLayout";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ReviewerTasksDetails = () => {
  const [taskID, settaskID] = useState("```markdown\nThis is the prompt.\n```");
  const [prompt, setPrompt] = useState("```markdown\nThis is the prompt.\n```");
  const [response, setResponse] = useState(
    "```markdown\nThis is the response.\n```"
  );
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const languageOptions = [
    "javascript",
    "python",
    "Java",
    "csharp",
    "swift",
    "go",
  ];
  const taskCategoryOptions = ["Tourism", "Sports", "Games"];
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const getTaskDetails = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const url = `${BASE_URL}/api/tasks/${id}/`;

      const response = await axios.get(url);
      settaskID(response.data.id);
      setPrompt(response.data.prompt);
      setResponse(response.data.response);
      setLanguage(response.data.language);
      setCategory(response.data.category);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Not Found",
          text: "ID Doesn't Match Any Task.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/dashboard");
      } else if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "FORBIDDEN",
          text: error.response.data.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/dashboard");
      } else if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "BAD REQUEST",
          text: error.response.data.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
        console.error("An error occurred", error);
      }
    }
  };
  useEffect(() => {
    getTaskDetails();
  }, []);

  const handleUnEnrollClick = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const url = `${BASE_URL}/api/tasks/${id}/skip/`;

      const response = await axios.post(url);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Task successfully unclaimed.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.error || "Failed to unclaim the task.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while unclaiming the task.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleSubmit = async () => {
    if (!rating) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select a rating.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/tasks/${id}/reviews/`,
        {
          prompt: prompt,
          response: response,
          language: language,
          category: category,
          feedback: feedback,
          rate: rating,
          accepted: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        navigate("/submitted");
        setPrompt("");
        setResponse("");
        setFeedback("");
        setRating(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Error",
          text: "Failed to submit task.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting the task.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleReject = async () => {
    if (!rating) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select a rating.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/tasks/${id}/reviews/`,
        {
          prompt: prompt,
          response: response,
          language: language,
          category: category,
          feedback: feedback,
          rate: rating,
          accepted: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Submitted Successfully",
          text: "Submitted Successfully",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/submitted");
        setPrompt("");
        setResponse("");
        setFeedback("");
        setRating(null);
      } else {
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting the task.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const renderMarkdown = (markdown) => {
    return (
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  style={atomDark}
                  showLineNumbers={true}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    );
  };

  return (
    <TasksLayout
      handleSubmit={handleSubmit}
      handleUnEnrollClick={handleUnEnrollClick}
      handleReject={handleReject}
    >
      <div className="p-4 md:ml-64 justify-center  flex lg:ml-64 xl:ml-64 h-auto pt-20">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 w-full max-w-3xl">
          {/* Prompt Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-7 dark:text-gray-300">Task ID: {taskID}</h2>
          </div>
          <div className="mb-6 ">
            <h2 className="text-xl dark:text-gray-300 font-semibold mb-7">
              Prompt
              <span className="text-sm font-semibold mb-2 text-red-500">
                {" "}
                (At least 100 words)
              </span>
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows="8"
              className="w-full border dark:bg-gray-300 border-gray-300 rounded-lg p-2 mb-4 "
            />
            <div className="p-4 bg-gray-100 dark:bg-gray-300 rounded overflow-x-auto">
              {renderMarkdown(prompt)}
            </div>
          </div>

          {/* Response Section */}
          <div className="mb-6">
            <h2 className="mb-7 dark:text-gray-300 text-xl font-semibold">
              Response
              <span className="text-sm font-semibold mb-2 text-red-500">
                {" "}
                (At least 100 words)
              </span>
            </h2>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows="8"
              className="w-full border dark:bg-gray-300 border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="p-4 bg-gray-100 dark:bg-gray-300 rounded overflow-x-auto">
              {renderMarkdown(response)}
            </div>
          </div>
          {/* Language Select */}
          <div className="w-full">
            <label className="block mb-2 dark:text-gray-300 font-semibold">Language</label>
            <select
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full px-2 py-2 border dark:bg-gray-300 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a language
              </option>
              {languageOptions.map((lang) => (
                <option
                  key={lang}
                  value={lang}
                  selected={language === lang} 
                >
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Task Category Select */}
          <div className="w-full mt-5">
            <label className="block mb-2  dark:text-gray-300 font-semibold">Task Category</label>
            <select
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full border-gray-400  px-2 py-2 border dark:bg-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a task category
              </option>
              {taskCategoryOptions.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  selected={category === cat} 
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Section */}
          <div className="mb-6 mt-5">
            <h2 className=" font-semibold dark:text-gray-300 mb-2">Rating</h2>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rate) => (
                <button
                  key={rate}
                  className={`w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none ${
                    rating === rate
                      ? rate === 5
                        ? "bg-blue-700 text-white dark:bg-gray-300 "
                        : rate === 4
                        ? "bg-blue-400 text-white dark:bg-gray-300"
                        : rate === 3
                        ? "bg-green-400 text-white dark:bg-gray-300"
                        : rate === 2
                        ? "bg-red-400 text-white dark:bg-gray-300"
                        : rate === 1
                        ? "bg-red-700 text-white dark:bg-gray-300"
                        : ""
                      : "bg-gray-200"
                  }`}
                  aria-label={`Rate ${rate}`}
                  onClick={() => setRating(rate)}
                >
                  {rate}
                </button>
              ))}
            </div>
          </div>

          {/* Overall Feedback Section */}
          <div>
            <h2 className="dark:text-gray-300  font-semibold mb-2">Overall Feedback</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              placeholder="Write Your Feedback Here ..."
              className="w-full border dark:bg-gray-400 border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>
      </div>
    </TasksLayout>
  );
};

export default ReviewerTasksDetails;
