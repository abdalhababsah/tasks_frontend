import axios from "axios";
import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";

function FeedbacksList() {  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [feedbacks, setFeedbacks] = useState({ results: [] }); 
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL; 
  const getFeedbacks = async () => {

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const url = `${BASE_URL}/api/tasks/feedback/?page=${currentPage}`;

    let data = await axios.get(url);
    setFeedbacks(data.data);
    setCurrentPage(data.data.current_page);
    setTotalPages(data.data.total_pages);
  };
  useEffect(() => {
    getFeedbacks()
  }, [currentPage]);
  const ratingMap = {
    5: { label: "Excellent", color: "bg-green-300 text-black" },
    4: { label: "Good", color: "bg-green-300 text-black" },
    3: { label: "Okay", color: "bg-yellow-400 text-white" },
    2: { label: "Poor", color: "bg-red-400 text-white" },
    1: { label: "Very Poor", color: "bg-red-500 text-white" },
  };

  const getBadgeClass = (rating) => {
    return ratingMap[rating]?.color || "bg-gray-200";
  };

  const getBadgeLabel = (rating) => {
    return ratingMap[rating]?.label || "No Rating";
  };

  const navigate = useNavigate();
  const handleViewClick = (feedbackId) => {
    navigate(`/feedback-view/${feedbackId}`);
    console.log(feedbackId)
  };
  

  return (
    <div className="relative overflow-x-auto shadow-md m-6">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 w-1/12 py-3" >
              Task Id
            </th>
            <th scope="col" className="px-6 py-3">
              Prompt
            </th>
            <th scope="col" className="px-6 py-3 w-fit">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Feedback
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.results.length > 0 ? (
            feedbacks.results.map((feedback) => (
              <tr
                key={feedback.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 text-gray-900 dark:text-white overflow-hidden">
                  <div className="line-clamp-2">{feedback.task.id}</div>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white overflow-hidden">
                  <div className="line-clamp-2">{feedback.task.prompt}</div>
                </td>
                <td className="px-6  py-4 ">
                  <span style={{ width: '80px' }}
                    className={`flex px-1 justify-center align-middle flex-row  text-xs font-medium ${getBadgeClass(
                      feedback.rate
                    )}`}
                  >
                    {getBadgeLabel(feedback.rate)} {feedback.rate}/5
                  </span>
                </td>
                <td className="px-6 py-4">{feedback.feedback}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleViewClick(feedback.task.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View Feedback
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No feedbacks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="m-5">

      <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
      </div>
    </div>
  );
}

export default FeedbacksList;
