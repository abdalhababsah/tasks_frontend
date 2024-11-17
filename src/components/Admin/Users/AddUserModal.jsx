import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useSelector } from "react-redux";

function AddUserModal({ isOpen, onClose, refreshUsers }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      await axios.post(`${BASE_URL}/api/users/create-user/`, {
        email, password, role, first_name, last_name 
      });
      Swal.fire({
        icon: 'success',
        title: 'User Added',
        text: `User ${email} added successfully.`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      setPassword("");
      setEmail("");
      setRole("admin");
      setFirst_name("");
      setLast_name("");
      refreshUsers();
      onClose(); 
    } catch (error) {
      const errorResponse = error.response?.data;
      let errorMessage = 'An error occurred.';

      if (errorResponse) {
        const errors = Object.values(errorResponse).flat();
        errorMessage = errors.join(' ');
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-8 shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl dark:text-gray-300 font-semibold mb-6">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              type="text"
              id="last_name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter last name"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-5 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter password"
              required
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 mt-5 mr-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>
          <div className="mb-5">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="admin">Admin</option>
              <option value="reviewer">Reviewer</option>
              <option value="tasker">Tasker</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-3 bg-blue-600 text-white hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default AddUserModal;
