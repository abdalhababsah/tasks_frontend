import React, { useState, useEffect } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { IoPersonAddOutline } from "react-icons/io5";
import { LiaUserEditSolid,LiaEye } from "react-icons/lia";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { useSelector  } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination";
import Swal from "sweetalert2";
import { BsFiletypeCsv } from "react-icons/bs";
import GenerateReportModal from "./GenerateReportModal";

function UsersList() {
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const getUsers = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const url = `${BASE_URL}/api/dashboard/search-users/?search=${searchQuery}&page=${currentPage}`;

    let data = await axios.get(url);
    setUsers(data.data.results);
    setCurrentPage(data.data.current_page);
    setTotalPages(data.data.total_pages);
  };

  const deleteUser = async (email) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.delete(
        `${BASE_URL}/api/users/delete-user/`,
        {
          data: { email },
        }
      );
      if (response.status === 200) {
        refreshUsers();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: response.data.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.error || "An error occurred",
        "error"
      );
    }
  };

  const handleDeleteUser = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the user with email: ${email}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(email);
      }
    });
  };

  
  const navigate = useNavigate();
  const viewPerformance = (id) => {
    navigate(`/users-perfomance/${id}`);
  };
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedUser) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const url = `${BASE_URL}/api/users/edit-user/${updatedUser.id}/`;

      const response = await axios.put(url, updatedUser);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "User Updated",
          text: `User ${updatedUser.email} updated successfully.`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });

        refreshUsers();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.error || "An error occurred",
        "error"
      );
    }
  };

  const refreshUsers = () => {
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, [searchQuery, currentPage]);

  return (
    <div className="h-screen">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-3">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <div className="pb-4 bg-white w-full dark:bg-gray-900 flex justify-between items-center">
            <div className="flex-grow">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 ml-3 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  id="table-search"
                  className="block mx-3 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full max-w-xs bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
            </div>
          
            <button
              onClick={() => setIsGenerateReportModalOpen(true)}
              className="px-4 py-2  mx-3 text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              <BsFiletypeCsv className="h-5 w-5 " />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 mr-3 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              <IoPersonAddOutline className="h-5 w-5 " />
            </button>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Attempts
                </th>
                <th scope="col" className="px-6 py-3">
                  Reviews
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b w-fit dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.attempts}</td>
                  <td className="px-6 py-4">{user.reviews}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                      <LiaUserEditSolid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="px-4 py-2 font-medium text-white bg-red-600 dark:bg-red-500 focus:outline-none focus:ring-2 hover:bg-red-700"
                    >
                      <TiDeleteOutline className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => viewPerformance(user.id)}
                      className="px-4 py-2 font-medium text-white bg-blue-300 dark:bg-blue-400 focus:outline-none focus:ring-2 hover:bg-blue-700"
                    >
                      <LiaEye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="m-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        refreshUsers={refreshUsers}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={editingUser}
        onEdit={handleSaveEdit}
      />
      <GenerateReportModal
        isOpen={isGenerateReportModalOpen}
        onClose={() => setIsGenerateReportModalOpen(false)}
      />
    </div>
  );
}

export default UsersList;
