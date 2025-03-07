// frontend/src/Reports.js

import React, { useState } from 'react';
import './Reports.css';

/**
 * Reports Component
 * Renders a page with options to generate different types of reports:
 * - PDF Report: Opens the generated PDF report in a new tab.
 * - CSV Export: Downloads a CSV file of inventory data.
 * - Inventory Chart: Generates a chart URL and displays the chart image.
 *
 * Props:
 * - projectId: The ID of the selected project for which the reports are generated.
 */
function Reports({ projectId }) {
  const [chartUrl, setChartUrl] = useState('');
  const [loadingChart, setLoadingChart] = useState(false);

  // Generate PDF Report by opening the endpoint in a new window
  const handleGeneratePDF = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/report`, '_blank');
  };

  // Trigger CSV export by opening the CSV endpoint
  const handleExportCSV = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/report/csv`, '_blank');
  };

  // Generate a chart for inventory items by fetching the chart URL from the backend
  const handleGenerateChart = async () => {
    setLoadingChart(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/report/chart`);
      const data = await response.json();
      setChartUrl(data.chartUrl);
    } catch (error) {
      console.error('Failed to generate chart:', error);
    } finally {
      setLoadingChart(false);
    }
  };

  return (
    <div className="reports-page">
      <h2>Reports</h2>
      <div className="reports-container">
        {/* PDF Report Card */}
        <div className="report-card">
          <h3>PDF Report</h3>
          <p>Generate a detailed PDF report for the project.</p>
          <button onClick={handleGeneratePDF}>Generate PDF</button>
        </div>

        {/* CSV Export Card */}
        <div className="report-card">
          <h3>CSV Export</h3>
          <p>Export inventory data as CSV for further analysis.</p>
          <button onClick={handleExportCSV}>Export CSV</button>
        </div>

        {/* Chart Generation Card */}
        <div className="report-card">
          <h3>Inventory Chart</h3>
          <p>Generate a visual chart of inventory distribution.</p>
          <button onClick={handleGenerateChart}>
            {loadingChart ? 'Generating Chart...' : 'Generate Chart'}
          </button>
          {chartUrl && (
            <div className="chart-container">
              <img src={chartUrl} alt="Inventory Chart" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
