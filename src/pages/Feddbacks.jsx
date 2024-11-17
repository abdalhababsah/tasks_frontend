import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../components/Layouts/MainLayout';
import FeedbacksList from '../components/Feedbacks/FeedbacksList';
import { useSelector } from 'react-redux';

function Feddbacks() {
  const [feedbackAvg, setFeedbackAvg] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);  
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL; 
  const getFeedbackAvg = async () => {
    try {
 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${BASE_URL}/api/dashboard/avg-feedback/`);
      setFeedbackAvg(response.data.average); 
    } catch (error) {
      console.error('Error fetching feedback average:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFeedbackAvg();
  }, []);

  return (
    <MainLayout>
      <main className="p-4 md:ml-64 h-auto pt-10 h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 pt-10 pb-3 mb-5">
          <div className="mb-8">
            <section className="body-font">
              <div className="container mx-auto p-6">
                <h4 className="text-xl text-gray-900 font-medium title-font mb-4">
                  Feedbacks
                </h4>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 gap-5 mt-4">
            <div className="bg-white overflow-hidden shadow dark:bg-gray-800">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    Feedback Average
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                  {isLoading ? 'Loading...' : (feedbackAvg ? `${feedbackAvg}/5` : 'N/A')}

                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <FeedbacksList />
      </main>
    </MainLayout>
  );
}

export default Feddbacks;
