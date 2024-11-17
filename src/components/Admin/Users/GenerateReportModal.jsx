import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { BsFiletypeCsv } from "react-icons/bs";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
function GenerateReportModal({ isOpen, onClose }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // Helper function to add one day to a date
  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };
  const handleDownloadReport = () => {
    let { startDate, endDate } = state[0];
    if (!endDate) {
      setError("Please select a date range before generating the report.");
      return;
    }
    setError("");
    setLoading(true);
    // Add one day to both startDate and endDate
    startDate = addOneDay(startDate);
    endDate = addOneDay(endDate);
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    axios({
      url: `${BASE_URL}/api/users/download-report/`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      },
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `taskers_reviewers_report_from_${formattedStartDate}_to_${formattedEndDate}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the report:", error);
        Swal.fire(
          "Error!",
          error.response?.data?.error || "Error downloading the report",
          "error"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (!isOpen) return null;
  const handleSubmit = () => {};
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-5">
        <h2 className="text-2xl font-semibold dark:text-gray-300 p-4">
          Users Report
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="max-w-7xl mx-auto py-5 ml-1 mr-1">
            <div className="">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 dark:text-gray-300 truncate">
                  Select the date for the report
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                  <div className="flex justify-center">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setState([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                      className="dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </dd>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="flex space-x-4 mt-4 justify-end px-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 dark:bg-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDownloadReport}
                    className={`px-4 py-2 text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      loading ? "cursor-not-allowed opacity-50" : ""
                    } dark:bg-green-600 dark:hover:bg-green-700`}
                    aria-label="Report"
                    disabled={loading}
                  >
                    {loading ? (
                      "Generating..."
                    ) : (
                      <>
                        <BsFiletypeCsv className="inline h-5 w-5 mr-2" />
                        Print
                      </>
                    )}
                  </button>
                </div>
              </dl>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
export default GenerateReportModal;
