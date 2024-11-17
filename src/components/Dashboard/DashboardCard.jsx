import React from 'react'

function DashboardCard({ title, value, today, secondaryText }) {
  return (
    <div className="bg-white overflow-hidden shadow dark:bg-gray-800">
    <div className="px-4 py-2 sm:p-6">
      <dl>
        <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">{title}</dt>
        <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">{value}</dd>
        {today && (
          <p className="mt-1 text-sm leading-9 font-semibold text-gray-500 truncate dark:text-gray-400">
            Attempted Today{" "}
            <span className="text-indigo-600 dark:text-indigo-400">{today}</span>
          </p>
        )}
        {secondaryText && (
          <p className="mt-1 text-sm leading-9 font-semibold text-gray-500 truncate dark:text-gray-400">
            {secondaryText}
          </p>
        )}
      </dl>
    </div>
  </div>
  )
}

export default DashboardCard