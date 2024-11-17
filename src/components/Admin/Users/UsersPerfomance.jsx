import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ChartCard from "../../Dashboard/ChartCard";
import DashboardCard from "../../Dashboard/DashboardCard";
import { FaUserCircle } from "react-icons/fa";
import Breadcrumb from "../../Breadcrumb";
function UsersPerfomance() {
  const [data, setData] = useState([]);
  const [taskersData, setTaskersData] = useState([]);
  const [tasksOverviewData, setTasksOverviewData] = useState({});
  const [dailyPerformanceData, setDailyPerformanceData] = useState({});
  const { token, user } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
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
    const fetchDailyPerformanceData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/dashboard/daily-performance-chart/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDailyPerformanceData(response.data);
      } catch (error) {
        console.error("Error fetching tasks overview data:", error);
      }
    };

    fetchData();
    fetchTaskersData();
    fetchTasksOverviewData();
    fetchDailyPerformanceData();
  }, [token]);

  const lineOptions = {
    chart: {
      type: "line",
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionX: 1
      },
      height: 430,
      backgroundColor: isDarkMode ? "#333333" : "#FFFFFF",
    },

    title: {
      text: "Daily performance",
      align: "left",
    },

    yAxis: {
      title: {
        text: "Number of Tasks",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2020",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: "Tasks",
        data: [
          4, 4, 6, 8, 11, 14, 7, 6, 1,
          4, 10,
        ],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const donutOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Overall Performance',
        align: 'left'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors:  "#000" ,
            borderRadius: 5,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -50,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
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
  
}
  return (
    <MainLayout>
      <div className="p-4 md:ml-64  pt-10 h-full dark:bg-gray-900">
        <div className="max-w-7xl mx-auto sm:px-6 lg:pt-10 ml-1 mr-1">
          <div className="mb-8">
            <section className="body-font">
              <div className="container  pt-6">
                <Breadcrumb
                  items={[
                    { label: "Users", path: "/Users" },
                    { label: "User Performace" },
                  ]}
                />
              </div>
            </section>
          </div>
        </div>
        <div className="mx-auto sm:px-6 mt-7 lg:pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="grid  gap-5 grid-cols-1">
              <div className="bg-white overflow-hidden shadow dark:bg-gray-800 border border-dashed border-gray-300  dark:border-gray-600">
                <div className="px-4 py-2 sm:p-6">
                  <dl className="flex flex-col gap-2">
                    <dd className=" leading-5 flex gap-3 font-medium  text-gray-500 truncate dark:text-gray-400">
                      <div>
                        <FaUserCircle className="w-10 text-3xl" />
                      </div>{" "}
                      <div className="text-xl mt-1">User ID: 12</div>
                    </dd>

                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                      Name: Abdelrahman Alhababseh
                    </dt>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                      Email: Abdelrahman.Alhababseh@menadevs.io
                    </dt>
                  </dl>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5 grid-cols-1">
                <DashboardCard
                  title="Total Tasks Reviewed"
                  value={data?.total_tasks_reviewed}
                  secondaryText={`Tasks Reviewed Today: ${
                    data?.reviewed_today || 0
                  }`}
                />
                <DashboardCard
                  title="Total Tasks Reviewed"
                  value={data?.total_tasks_reviewed}
                  secondaryText={`Tasks Reviewed Today: ${
                    data?.reviewed_today || 0
                  }`}
                />
              </div>
            </div>
            <div>
              <ChartCard
                title="Task Overview"
                options={donutOptions}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
          <div className="mt-6">
            <ChartCard
              title="Daily performance"
              options={lineOptions}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UsersPerfomance;
