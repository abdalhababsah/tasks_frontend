import React from "react";
import { useSelector } from "react-redux";

function Sidebar({ isOpen }) {
  const role = useSelector((state) => state.auth.user.role);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul className="space-y-2">
          {role === "reviewer" && (
            <li>
              <div className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white  group">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V3zm2 1v2h8V4H6zm0 4v2h8V8H6zm0 4v2h8v-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Important Notes:</span>
              </div>
              <hr className="border solid text-black "/>

              <div className="ml-10 mt-2 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Instruction:</strong> Ensure the prompt is unique and
                  clearly defines the task. Avoid using large language models
                  (LLMs) for generating responses. Responses should be
                  well-structured and free from grammar issues.
                </p>
              </div>
            </li>
          )}

          {role === "tasker" && (
            <li>
              <div className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white  group">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V3zm2 1v2h8V4H6zm0 4v2h8V8H6zm0 4v2h8v-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Important Notes:</span>
              </div>
              <hr className="border solid text-black "/>

              <div className="ml-10 mt-2 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Instruction:</strong> Ensure the prompt is unique and
                  clearly defines the task. Avoid using large language models
                  (LLMs) for generating responses. Responses should be
                  well-structured and free from grammar issues.
                </p>
              </div>
            </li>
          )}
          <li>
          <hr className="border solid text-black "/>
            <div className="ml-10 mt-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Prompt:</strong> Ensure the prompt is set in a real-life context
                scenario. For the time being, you are required to write in the
                following domains:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Sports</li>
                <li>Tourism</li>
                <li>Games</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
