import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

function EditUserModal({ isOpen, onClose, user, onEdit }) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setFirst_name(user.first_name || "");
      setLast_name(user.last_name || "");
      setEmail(user.email || "");
      setRole(user.role || "admin"); 
    }
  }, [user]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = { ...user, first_name, last_name, email, role };


    onEdit(updatedUser);

    Swal.fire({
      icon: 'success',
      title: 'User Updated',
      text: `User ${email} updated successfully.`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-8 shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-6">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter email"
              required
            />
          </div>
   
          <div className="mb-5">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default EditUserModal;
