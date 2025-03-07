// backend/controllers/reportController.js

const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const Project = require('../models/Project');
const InventoryItem = require('../models/InventoryItem');

/**
 * Generate a PDF report for a specific project.
 * Supports optional query parameters startDate and endDate
 * to filter inventory items based on their creation date.
 *
 * Expected query parameters:
 * - startDate: ISO string representing the start date.
 * - endDate: ISO string representing the end date.
 */
exports.generateProjectReport = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Fetch the project details
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Build a filter for inventory items, optionally including a time range filter
    const filter = { project: projectId };

    // If startDate and/or endDate are provided, filter on the 'createdAt' field.
    const { startDate, endDate } = req.query;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    // Fetch inventory items matching the filter
    const items = await InventoryItem.find(filter);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the response headers to indicate a PDF file attachment
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="project_report.pdf"');

    // Pipe the PDF document to the response stream
    doc.pipe(res);

    // Write report content
    doc.fontSize(20).text(`Report for Project: ${project.name}`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Description: ${project.description || 'N/A'}`);
    doc.moveDown();

    // Include the time range if provided
    if (startDate || endDate) {
      doc.fontSize(12).text(`Time Range: ${startDate || 'N/A'} to ${endDate || 'N/A'}`);
      doc.moveDown();
    }

    doc.fontSize(16).text('Inventory Items:', { underline: true });
    doc.moveDown();

    if (items.length === 0) {
      doc.fontSize(12).text('No inventory items found for this project in the specified time range.');
    } else {
      items.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.name} - Quantity: ${item.quantity}`);
      });
    }

    // Finalize PDF file
    doc.end();
  } catch (err) {
    console.error('Report generation error:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

/**
 * Export inventory items for a specific project as a CSV file.
 * Fetches inventory items from the database, converts them to CSV using json2csv,
 * and sends the CSV as a downloadable file.
 */
exports.exportInventoryCSV = async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const items = await InventoryItem.find({ project: projectId });
      const fields = ['_id', 'name', 'quantity', 'createdAt'];
      const parser = new Parser({ fields });
      const csv = parser.parse(items);
  
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="inventory_report.csv"');
      res.send(csv);
    } catch (err) {
      console.error('CSV export error:', err);
      res.status(500).json({ error: 'Failed to export CSV' });
    }
  };
  
  /**
   * Generate a chart URL for inventory items of a specific project.
   * Uses the QuickChart API to generate a bar chart that visualizes the inventory quantities.
   */
  exports.generateInventoryChart = async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const items = await InventoryItem.find({ project: projectId });
      // Prepare data for the chart
      const labels = items.map(item => item.name);
      const data = items.map(item => item.quantity);
      const chartConfig = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Inventory Quantity',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Inventory Distribution'
          }
        }
      };
  
      // Generate the chart URL using QuickChart API
      const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
      res.json({ chartUrl });
    } catch (err) {
      console.error('Chart generation error:', err);
      res.status(500).json({ error: 'Failed to generate chart' });
    }
  };