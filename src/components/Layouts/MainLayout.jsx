import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <div className="antialiased dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />
      {/* Sidebar */}
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
