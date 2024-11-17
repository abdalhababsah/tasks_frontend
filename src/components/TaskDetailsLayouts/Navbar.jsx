import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

function Navbar({ handleUnEnrollClick, handleSubmit,handleReject }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { role } = useSelector(state => state.auth.user);

  const handleUnenroll = () => {
    if (handleUnEnrollClick) {
      handleUnEnrollClick();
    }
  };

  

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              onClick={handleSidebarToggle}
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <NavLink to="/dashboard" className="flex items-center mr-4">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MENA<span className='text-[#3de533]'>Devs</span>{' '}AI</span>
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span>Started Time: <strong>10:00 AM</strong></span>
            </div>
            <div className="flex items-center justify-end space-x-2">
            {role === 'reviewer' && (
                <button
                className="block py-2 px-4 w-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white text-left"
                onClick={handleUnenroll} // Call handleUnenroll on click
              >
                  Unenroll
                </button>
              )}
            {role === 'reviewer' && (
                <button
                  className="px-3 py-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
                  onClick={handleReject}
                >
                  Reject
                </button>
              )}
            <button
              className="px-2 py-2 text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
  
          </div>
        </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
}

export default Navbar;
