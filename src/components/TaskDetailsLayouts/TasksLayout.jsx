import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const TasksLayout = ({ children, handleSubmit, handleUnEnrollClick, handleReject }) => {
  return (
    <div className="antialiased dark:bg-gray-900">
      <Navbar handleSubmit={handleSubmit} handleUnEnrollClick={handleUnEnrollClick} handleReject={handleReject}/>
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}

export default TasksLayout;
