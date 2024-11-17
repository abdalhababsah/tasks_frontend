import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RiFeedbackFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";

function Sidebar({ isOpen }) {
  const {role} = useSelector((state) => state.auth.user);

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
          
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    isActive ? " bg-gray-200 dark:bg-gray-600" : ""
                  }`
                }
              >
                <MdDashboard className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
        
          {role === "admin" && (
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    isActive ? "bg-gray-200 dark:bg-gray-600" : ""
                  }`
                }
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 10a3 3 0 110-6 3 3 0 010 6zm0 2c-3.313 0-6 2.687-6 6v1h12v-1c0-3.313-2.687-6-6-6z" />
                </svg>
                <span className="ml-3">Users</span>
              </NavLink>
            </li>
          )}
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <NavLink
              to="/document"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  isActive ? "bg-gray-200 dark:bg-gray-600" : ""
                }`
              }
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-3">Smile Docs</span>
            </NavLink>
          </li>
          {(role === "tasker" || role === "reviewer") && (
            <li>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    isActive ? "bg-gray-200 dark:bg-gray-600" : ""
                  }`
                }
              >
                <RiFeedbackFill className="ml-1 w-5 h-6 text-gray-500" />

                <span className="ml-3">Feedback</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
