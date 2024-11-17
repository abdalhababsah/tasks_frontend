import React, {useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layouts/MainLayout";
import axios from "axios";
import { useSelector } from 'react-redux';

function TaskerDashboard() {
  const navigate = useNavigate();
  const [tasksNumber, setTasksNumber] = React.useState(0);
  const [tasksToday, setTasksToday] = React.useState(0);
  const { first_name } = useSelector(state => state.auth.user);
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL; 
  let getTasksNumber = async () => {
   
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let data = await axios.get(`${BASE_URL}/api/dashboard/tasker/`)
    setTasksNumber(data.data.total_tasks);
    setTasksToday(data.data.total_tasks_today);
  }
  useEffect(() => {
    getTasksNumber()
  }, []);
  const handleEnrollClick = () => {
    navigate(`/tasks`);
  };
  return (
    <MainLayout>
      <main className="p-4 md:ml-64 h-screen pt-10">
      <div className="max-w-7xl mx-auto sm:px-6 py-10 mb-5">
          <div className="mb-8">
          <section className=" body-font">
            <div className="container mx-auto p-6">
              <h4 className="text-xl  text-gray-900 dark:text-gray-400 font-medium title-font mb-4">
              Welcome, {first_name}!
              </h4>
            </div>
          </section>
        </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-4">
              <div className="bg-white overflow-hidden shadow   dark:bg-gray-800">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm  leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                      Total Tasks Submitted
                    </dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                      {tasksNumber}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow   dark:bg-gray-800">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                      Tasks Submitted Today
                    </dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                      {tasksToday}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
       
       
          <div className="border-2 border-dashed border-gray-300  dark:border-gray-600 h-auto md:h-fit flex items-center justify-center px-5 mx-5 py-1">
            <section className=  " body-font w-full">
              <div className="container mx-auto flex flex-col md:flex-row items-center py-3 px-6">
                <h2 className="text-2xl dark:text-gray-400 md:text-3xl text-gray-900 font-medium title-font mb-4 md:mb-0 md:w-1/2">
                  Smile Project 😊
                </h2>
                <div className="md:w-1/2 md:pl-6">
                  <p className="leading-relaxed text-base mb-4 dark:text-gray-400">
                  In this project, you will create prompts to train an artificially intelligent (AI) assistant. This AI assistant understands text commands and questions and can write text responses. Its goal is to follow any given command in a way that is as helpful as possible.
                  </p>
                  <div  className="flex flex-col md:flex-row md:mt-4 mt-4">
                    <button type="button"
                    onClick={() => handleEnrollClick()} 
                    className="inline-flex text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600  mb-2 md:mb-0 md:mr-4">
                      Start tasking

                  
                    
                    </button>
                    <NavLink to="/document" className="text-indigo-500 inline-flex items-center mt-2 md:mt-0">
                      Read Documentation
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </NavLink>
                  </div>
                </div>
              </div>
            </section>
          </div>
     
      </main>
    </MainLayout>
  );
}

export default TaskerDashboard;
