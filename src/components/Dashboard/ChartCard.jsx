import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';

// Initialize exporting module for Highcharts
exporting(Highcharts);

function ChartCard({ title, options, isDarkMode }) {
  // Dark mode theme configuration
  const darkTheme = {
    chart: {
      backgroundColor: '#333333', 
      style: { color: '#f3f4f6' },
    },
    title: {
      style: { color: '#f3f4f6' },
    },
    xAxis: {
      labels: { style: { color: '#f3f4f6' } }, 
    },
    yAxis: {
      labels: { style: { color: '#f3f4f6' } }, 
      title: { style: { color: '#f3f4f6' } }, 
    },
    tooltip: {
      backgroundColor: '#333333', 
      style: { color: '#f3f4f6' },
    },
    legend: {
      itemStyle: { color: '#f3f4f6' },
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: '#f3f4f6',
        },
      },
    },
  };

  const themeOptions = isDarkMode ? darkTheme : {};

  return (
    <div className={`bg-white p-6  shadow-md ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
    
      <HighchartsReact
        highcharts={Highcharts}
        options={{ ...options, ...themeOptions }}
      />
    </div>
  );
}

export default ChartCard;
