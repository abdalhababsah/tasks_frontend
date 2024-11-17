import React, { useState } from "react";
import UsersList from "../../components/Admin/Users/UsersList";
import MainLayout from "../../components/Layouts/MainLayout";


import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

function Users() {


  return (
    <MainLayout>
      <div className="p-4 md:ml-64 h-auto pt-20">
      

        <UsersList />
      </div>
    </MainLayout>
  );
}

export default Users;
