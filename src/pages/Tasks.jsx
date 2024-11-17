import React from 'react'
import { useSelector } from 'react-redux'
import ReviewerTasksDetails from './Reviewer/ReviewerTaskDetails'
import AttempterTaskDetails from './Attempter/AttempterTaskDetails'
function Tasks() {
    const {role} = useSelector(state => state.auth.user);
    return (
    <>    
    {role === 'reviewer' && <ReviewerTasksDetails />}
    {role === 'tasker' && <AttempterTaskDetails />}
    </>

  )
}
export default Tasks