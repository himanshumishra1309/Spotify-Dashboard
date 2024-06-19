import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

const App = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [chartType, setChartType] = useState('bar');

  const accessToken = "BQCABVaOaKTW7bPdfvUWBj4ZiOVk8EufL-J9j4svGph7MBarO-nksKpfxzO-8zcZhYRJ-82n39B1_3NUhsHCC-nzVcjup0HXpgbZAg_eWPKDOuP2GCo";

  useEffect(() => {
    if (accessToken) {
      fetch('https://api.spotify.com/v1/search?q=year:2023&type=track&market=IN&limit=50', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        const tracks = data.tracks.items;
        const monthlyCount = Array(12).fill(0);

        tracks.forEach(track => {
          const releaseDate = new Date(track.album.release_date);
          const month = releaseDate.getMonth();
          monthlyCount[month]++;
        });

        setMonthlyData(monthlyCount);
      })
      .catch(error => console.error('Error fetching Spotify data:', error));
    }
  }, [accessToken]);

  const renderChart = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const barChartData = {
      labels: months,
      datasets: [{
        label: 'Number of Songs Released',
        data: monthlyData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)', 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const pieChartData = {
      labels: months,
      datasets: [{
        label: 'Number of Songs Released',
        data: monthlyData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',   
          'rgba(54, 162, 235, 0.5)',   
          'rgba(255, 206, 86, 0.5)',   
          'rgba(75, 192, 192, 0.5)',   
          'rgba(255, 165, 0, 0.5)',    
          'rgba(255, 192, 203, 0.5)',  
          'rgba(128, 0, 128, 0.5)',    
          'rgba(75, 0, 130, 0.5)',     
          'rgba(238, 130, 238, 0.5)',  
          'rgba(173, 216, 230, 0.5)',  
          'rgba(144, 238, 144, 0.5)',  
          'rgba(128, 128, 128, 0.5)'   
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',    
          'rgba(54, 162, 235, 1)',    
          'rgba(255, 206, 86, 1)',    
          'rgba(75, 192, 192, 1)',    
          'rgba(255, 165, 0, 1)',     
          'rgba(255, 192, 203, 1)',   
          'rgba(128, 0, 128, 1)',     
          'rgba(75, 0, 130, 1)',      
          'rgba(238, 130, 238, 1)',   
          'rgba(173, 216, 230, 1)',   
          'rgba(144, 238, 144, 1)',   
          'rgba(128, 128, 128, 1)'    
        ],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return (
      <div className="chart-wrapper">
        {chartType === 'pie' && <Pie data={pieChartData} options={options} />}
        {chartType === 'line' && <Line data={barChartData} options={options} />}
        {chartType === 'bar' && <Bar data={barChartData} options={options} />}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Spotify Dashboard</h1>
      </div>
      <div className="chart-container">
        <div className="chart-type-selector">
          <label htmlFor="chart-type">Chart Type:</label>
          <select id="chart-type" value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
            <option value="line">Line</option>
          </select>
        </div>
        {renderChart()}
      </div>
    </div>
  );
};

export default App;
