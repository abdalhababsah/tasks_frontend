import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NavLink, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ReactMarkdown from "react-markdown";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function TasksList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [language, setLanguage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tasks, setTasks] = useState({ results: [] });
  const { id } = useSelector((state) => state.auth.user);
  const languageOptions = [
    { display: "All", value: "" },
    { display: "Python", value: "python" },
    { display: "JavaScript", value: "javascript" },
    { display: "Java", value: "java" },
    { display: "C#", value: "csharp" },
    { display: "Swift", value: "swift" },
    { display: "Go", value: "go" },
  ];
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const getTasks = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const baseUrl = `${BASE_URL}/api/tasks/tasks/`;
    let url = baseUrl;

    if (language) {
      url += `?language=${language}&page=${currentPage}`;
    } else {
      url += `?page=${currentPage}`;
    }

    let data = await axios.get(url);
    setTasks(data.data);
    setCurrentPage(data.data.current_page);
    setTotalPages(data.data.total_pages);
  };

  useEffect(() => {
    getTasks();
  }, [language, currentPage]);

  const handleViewClick = (prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPrompt("");
  };

  const navigate = useNavigate();
  const handleEnrollClick = async (taskId) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await axios.post(`${BASE_URL}/api/tasks/select-task/${taskId}/`);
      navigate(`/tasks/${taskId}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Enrollment Failed",
          text: error.response.data.error || "Bad request",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong! Please try again.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  };
  const modules = {
    toolbar: false,
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md  m-3">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <div className="mb-6">
            <h2 className="text-xl m-3 dark:text-gray-300 font-semibold mb-2">
              Filter language
            </h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full px-4 py-2 m-3 border border-gray-300  shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="" disabled>
                Select a language
              </option>
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.display}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task ID
              </th>
              <th scope="col" className="px-6 py-3">
                Prompt
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tasks.results) && tasks.results.length > 0 ? (
              tasks.results.map((task) => (
                <tr
                  key={task.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-7  py-4 text-gray-900 dark:text-white overflow-hidden">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-300 overflow-hidden">
                    <div className="line-clamp-2 ">{task.prompt}</div>
                  </td>
                  <td className="px-6 py-4">{task.language}</td>
                  <td className="px-6 py-4 flex gap-2">
                    {task.claimed_by === id}
                    {task.claimed_by === id ? (
                      <NavLink
                        to={`/tasks/${task.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Continue
                      </NavLink>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleViewClick(task.prompt)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEnrollClick(task.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Enroll
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
          <div className="m-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </table>

        {isModalOpen && (
          <div
            id="editUserModal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white  shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b  dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Prompt
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900  text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-6 space-y-6 dark:text-gray-300">
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
                    {selectedPrompt}
                  </ReactMarkdown>
                </div>
                <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200  dark:border-gray-600">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TasksList;
