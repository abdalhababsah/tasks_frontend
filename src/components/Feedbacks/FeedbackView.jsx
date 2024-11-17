import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MainLayout from '../Layouts/MainLayout';
import Breadcrumb from '../Breadcrumb'; 
import { useSelector } from 'react-redux';

const FeedbackView = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL; 
  useEffect(() => {
    const fetchFeedback = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const url = `${BASE_URL}/api/tasks/feedback/${id}/`;
      try {
        const { data } = await axios.get(url);
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [id]);

  if (!feedback) return <p>Loading...</p>;

  const { rate, feedback: reviewerFeedback, prompt, response } = feedback;

  return (
    <MainLayout>
      <div className="p-4 md:ml-64 lg:ml-64  xl:ml-64 h-auto pt-20">
        <div className="flex justify-start w-full mb-4">
          <Breadcrumb
            items={[
              { label: 'Feedbacks', path: '/feedback' },
              { label: 'Feedback View', path: `/feedback-view/${id}` }
            ]}
          />
        </div>
        <div className="flex justify-center  w-full">
          <div className="bg-white shadow-lg dark:bg-gray-800  p-5 w-full max-w-3xl">
            <div id="feedback_box" className="flex flex-col w-full">
              <div className="mb-6">
                <div className="flex items-start mb-4">
                  <div className="flex flex-col pr-6 border-r border-gray-300">
                    <p className="text-base font-semibold dark:text-gray-300 mb-2">Overall Rating:</p>
                    <p className="text-xl font-bold text-indigo-600">{rate}</p>
                  </div>
                  <div className="pl-6">
                    <p className="text-base font-semibold dark:text-gray-300 mb-2">Feedback:</p>
                    <p className="text-gray-400">{reviewerFeedback}</p>
                  </div>
                </div>
              </div>
              <hr className="border solid text-black mb-6" />
              <div className="mb-6">
                <h2 className="text-xl font-semibold dark:text-gray-300 mb-7">Prompt</h2>
                <div className="mt-4 p-4 bg-gray-100  overflow-x-auto">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <div className="overflow-x-auto">
                            <SyntaxHighlighter
                              style={atomDark}
                              showLineNumbers={true}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {prompt}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="mb-7 text-xl font-semibold">Response</h2>
                <div className="mt-4 p-4 bg-gray-100  overflow-x-auto">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <div className="overflow-x-auto">
                            <SyntaxHighlighter
                              style={atomDark}
                              showLineNumbers={true}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {response}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeedbackView;
