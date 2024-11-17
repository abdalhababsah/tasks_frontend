import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function Documents() {
  return (
    <MainLayout>
      <div className="flex justify-center items-center flex-col p-4 md:ml-64 h-auto pt-20 space-y-4">
          {/* Download or View Link */}
          <div>
          <a
            href="https://docs.google.com/document/d/1ScG51MF4S5ltqiOAJ5RzPnM8PVNGpaQiypozSsWcFZw/export?format=pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Download the document as PDF
          </a>
        </div>
        <div className="shadow-lg rounded-lg overflow-hidden max-w-4xl w-full h-[80vh]">
          <iframe
            title="Google smile project Document"
            src="https://docs.google.com/document/d/1ScG51MF4S5ltqiOAJ5RzPnM8PVNGpaQiypozSsWcFZw/edit?usp=sharing"
            className="w-full h-full border-none"
            allowFullScreen
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Documents;
