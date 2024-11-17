import React from "react";
import successImage from "../assets/submit-successfully.png"; 
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function TaskSubmitted() {
    const {role} = useSelector((state) => state.auth.user);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 animate-fadeIn">
      <img
        src={successImage}
        alt="Task Submitted Successfully"
        className="mb-8 w-20 h-auto animate-bounce"
      />
      <h1 className="text-2xl dark:text-gray-400 font-semibold mb-4 animate-slideInUp">
        Task Submitted Successfully!
      </h1>
      <div className="space-x-4 ">
      
        <NavLink
          to="/dashboard"
          className="px-7 py-2 bg-blue-500 text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Dashboard
        </NavLink>
        {role === "tasker" && (
        <NavLink
          to="/tasks"
          className="px-4 py-2 bg-green-500 text-white shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Continue Tasking
        </NavLink>)}
      </div>    
    </div>
  );
}

export default TaskSubmitted;
