import React, { useEffect } from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import TasksList from "../../components/Reviewer/TasksList";
import { useSelector } from "react-redux";
import axios from "axios";
function Tasks() {
  const { first_name } = useSelector((state) => state.auth.user);
  const [tasksNumber, setTasksNumber] = React.useState(0);
  const [tasksToday, setTasksToday] = React.useState(0);
  const [acceptedRatio, setAcceptedRatio] = React.useState(0);
  const [rejectedRatio, setRejectedRatio] = React.useState(0);

  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let getTasksNumber = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let data = await axios.get(`${BASE_URL}/api/dashboard/reviewer/`);
    setTasksNumber(data.data.total_tasks_reviewed);
    setTasksToday(data.data.reviewed_today);
    setAcceptedRatio(data.data.accepted_tasks_ratio);
    setRejectedRatio(data.data.rejected_tasks_ratio);
  };
  useEffect(() => {
    getTasksNumber();
  }, []);

  return (
    <>
      <MainLayout>
        <main className="p-4 md:ml-64 h-auto pt-10">
          <div className="max-w-7xl mx-auto sm:px-6 lg:py-10 ">
            <div className="mb-8">
              <section className=" body-font">
                <div className="container mx-auto p-6">
                  <h4 className="text-xl  text-gray-900 dark:text-gray-300 font-medium title-font mb-4">
                    Welcome, {first_name}!
                  </h4>
                </div>
              </section>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-4">

              <div className="bg-white overflow-hidden shadow dark:bg-gray-800">
                <div className="px-4 py-2 sm:p-6">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500  truncate dark:text-gray-400">
                      Total Tasks Reviewed
                    </dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                      {tasksNumber}
                    </dd>
                    <p className="mt-1 text-sm leading-9 font-semibold text-gray-500 truncate dark:text-gray-400">
                      Reviewed Today{" "}
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {tasksToday}
                      </span>
                    </p>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow dark:bg-gray-800">
                <div className="px-4 py-2 sm:p-6">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    Accepted Task Ratio
                    </dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                      {acceptedRatio}
                    </dd>
                    <p className="mt-1 text-sm leading-9 font-semibold text-gray-500 truncate dark:text-gray-400">
                    Rejected Task Ratio{" "}
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {rejectedRatio}
                      </span>
                    </p>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <TasksList />
        </main>
      </MainLayout>
    </>
  );
}

export default Tasks;
