import React, { useEffect } from 'react'
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AttempterDashboard from "../pages/Attempter/AttempterDashboard";
import ReviewerDashboard from "../pages/Reviewer/ReviewerDashboard";
import { useSelector } from 'react-redux';

function Dashboard() {
    const [currectRole, setcurrectRole] = React.useState('');
    const {role} = useSelector(state => state.auth.user);
    useEffect(() => {
        setcurrectRole(role);
    }, [role])
  return (
    <>
    
    {currectRole === 'admin' && <AdminDashboard/>}
    {currectRole === 'tasker' && <AttempterDashboard />}
    {currectRole === 'reviewer' && <ReviewerDashboard />}
    </>

  )
}

export default Dashboard