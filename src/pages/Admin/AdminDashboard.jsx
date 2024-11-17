import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/Layouts/MainLayout";
import { useSelector } from "react-redux";
import ChartCard from "../../components/Dashboard/ChartCard";
import DashboardCard from "../../components/Dashboard/DashboardCard";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [taskersData, setTaskersData] = useState([]);
  const [tasksOverviewData, setTasksOverviewData] = useState({});
  const { token, user } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    const handleDarkModeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleDarkModeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/dashboard/overview/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTaskersData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/dashboard/top-10-taskers-taskers/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTaskersData(response.data);
      } catch (error) {
        console.error("Error fetching taskers data:", error);
      }
    };

    const fetchTasksOverviewData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/dashboard/tasks-overview/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasksOverviewData(response.data);
      } catch (error) {
        console.error("Error fetching tasks overview data:", error);
      }
    };

    fetchData();
    fetchTaskersData();
    fetchTasksOverviewData();
  }, [token]);

  const donutOptions = {
    chart: {
      type: "pie",
      height: 350,
      backgroundColor: isDarkMode ? "#333333" : "#FFFFFF",
    },
    title: {
      text: "Task Overview",
      style: {
        color: isDarkMode ? "#FFFFFF" : "#000000",
      },
    },
    plotOptions: {
      pie: {
        innerSize: "50%",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}",
          style: {
            color: isDarkMode ? "#FFFFFF" : "#000000",
          },
        },
      },
    },
    series: [
      {
        name: "Tasks",
        data: [
          ["Total Tasks", tasksOverviewData?.total_tasks || 0],
          ["Accepted Tasks", tasksOverviewData?.total_tasks_accepted || 0],
          ["Rejected Tasks", tasksOverviewData?.total_tasks_rejected || 0],
          ["Pending Tasks", tasksOverviewData?.total_tasks_pending || 0],
        ],
        colors: ["#00E396", "#008FFB", "#FF4560", "#FEB019"],
      },
    ],
    exporting: { enabled: true },
  };

  const barOptions = {
    chart: {
      type: "column",
      height: 350,
      backgroundColor: isDarkMode ? "#333333" : "#FFFFFF",
    },
    title: {
      text: "Top 10 Attempters",
      style: {
        color: isDarkMode ? "#FFFFFF" : "#000000",
      },
    },
    xAxis: {
      categories: taskersData.map(
        (tasker) =>
          `${tasker.first_name || "User"} ${tasker.last_name || tasker.id}`
      ),
      title: { text: "Taskers", style: { color: isDarkMode ? "#FFFFFF" : "#000000" } },
      labels: { style: { color: isDarkMode ? "#FFFFFF" : "#000000" } },
    },
    yAxis: {
      min: 0,
      title: { text: "Tasks", align: "high", style: { color: isDarkMode ? "#FFFFFF" : "#000000" } },
      labels: { style: { color: isDarkMode ? "#FFFFFF" : "#000000" } },
    },
    tooltip: { valueSuffix: " tasks" },
    plotOptions: {
      column: {
        dataLabels: { enabled: true, style: { color: isDarkMode ? "#FFFFFF" : "#000000" } },
      },
    },
    series: [
      {
        name: "Total Tasks",
        data: taskersData.map((tasker) => tasker.total_tasks),
        color: "#00E396",
      },
      {
        name: "Total Reviews",
        data: taskersData.map((tasker) => tasker.total_reviews),
        color: "#008FFB",
      },
    ],
    exporting: { enabled: true },
  };

  return (
    <MainLayout>
      <div className="p-4 md:ml-64 h-auto pt-10 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto sm:px-6 lg:py-10 ml-1 mr-1">
          <div className="mb-8">
            <section className="body-font">
              <div className="container mx-auto p-6">
                <h4 className="text-xl text-gray-900 dark:text-white font-medium title-font mb-4">
                  Welcome, {user.first_name}!
                </h4>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
            <DashboardCard
              title="Total Tasks Attempted"
              secondaryText={`Tasks Attempted Today: ${
                data?.attempted_today || 0
              }`}
              value={data?.total_tasks}
            />
            <DashboardCard
              title="Total Tasks Reviewed"
              value={data?.total_tasks_reviewed}
              secondaryText={`Tasks Reviewed Today: ${
                data?.reviewed_today || 0
              }`}
            />
            <DashboardCard
              title="Users Active Today"
              value={data?.users_active_today}
            />

            <DashboardCard
              title="Accepted Tasks Ratio"
              value={`${data?.accepted_tasks_ratio || 0}%`}
              secondaryText={`Rejected Tasks Ratio: ${
                data?.rejected_tasks_ratio || 0
              }%`}
            />
          </div>
        </div>
        <div className="mx-auto sm:px-6 mt-7 lg:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ChartCard title="Task Overview" options={donutOptions} isDarkMode={isDarkMode} />
            <ChartCard title="Top 10 Attempters" options={barOptions} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
