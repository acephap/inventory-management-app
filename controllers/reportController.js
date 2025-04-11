// backend/controllers/reportController.js

const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const Project = require('../models/Project');
const InventoryItem = require('../models/InventoryItem');
const csvParser = require('csv-parser');
const fs = require('fs');

/**
 * generateProjectReport
 * ---------------------
 * Generates a PDF report for a specific project.
 * Supports optional query parameters:
 *  - startDate: ISO string for the start of a time range.
 *  - endDate: ISO string for the end of a time range.
 *
 * The report includes project details and a list of inventory items filtered
 * by the provided time range (if any).
 */
exports.generateProjectReport = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Fetch project details from the database
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Build a filter for inventory items (include time range if provided)
    const filter = { project: projectId };
    const { startDate, endDate } = req.query;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Retrieve inventory items matching the filter
    const items = await InventoryItem.find(filter);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers to trigger file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="project_report.pdf"');

    // Pipe the PDF document to the response stream
    doc.pipe(res);

    // Write the PDF content
    doc.fontSize(20).text(`Report for Project: ${project.name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Description: ${project.description || 'N/A'}`);
    doc.moveDown();

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

    // Finalize the PDF document
    doc.end();
  } catch (err) {
    console.error('Report generation error:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

/**
 * exportInventoryCSV
 * ------------------
 * Exports inventory items for a specific project as a CSV file.
 * Fetches inventory items from the database, converts them to CSV format
 * using json2csv, and sends the CSV file as a downloadable response.
 */
exports.exportInventoryCSV = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const items = await InventoryItem.find({ project: projectId });
    const fields = ['_id', 'name', 'quantity', 'createdAt'];
    const parser = new Parser({ fields });
    const csvData = parser.parse(items);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="inventory_report.csv"');
    res.send(csvData);
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
};

/**
 * importInventoryCSV
 * ------------------
 * Imports inventory items in bulk from an uploaded CSV file.
 * Expects a CSV file (handled by multer) attached to req.file.
 * Parses the CSV file using csv-parser and bulk inserts the data
 * into the InventoryItem collection, associating each entry with the specified project.
 */
exports.importInventoryCSV = async (req, res) => {
  try {
    // Check if a file was uploaded via multer
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const projectId = req.params.projectId;
    const results = [];

    // Create a read stream from the uploaded file and pipe through csv-parser
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Map CSV rows to inventory documents
          const itemsToInsert = results.map(row => ({
            name: row.name,
            quantity: Number(row.quantity),
            project: projectId
          }));

          // Bulk insert the parsed inventory items into the database
          const insertedItems = await InventoryItem.insertMany(itemsToInsert);

          // Delete the file after processing (optional)
          fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });

          res.status(201).json(insertedItems);
        } catch (insertErr) {
          console.error('Bulk import error:', insertErr);
          res.status(500).json({ error: 'Failed to import CSV data' });
        }
      });
  } catch (err) {
    console.error('CSV import error:', err);
    res.status(500).json({ error: 'Failed to import CSV' });
  }
};

/**
 * generateInventoryChart
 * ------------------------
 * Generates a chart URL for inventory items of a specific project using QuickChart.
 * Aggregates inventory data, builds a Chart.js configuration object, and encodes it
 * into a URL that can be rendered as an image on the frontend.
 */
exports.generateInventoryChart = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const items = await InventoryItem.find({ project: projectId });

    // Prepare chart data arrays from inventory items
    const labels = items.map(item => item.name);
    const data = items.map(item => item.quantity);

    // Build the Chart.js configuration object
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

    // Generate the QuickChart URL by encoding the configuration object
    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    res.json({ chartUrl });
  } catch (err) {
    console.error('Chart generation error:', err);
    res.status(500).json({ error: 'Failed to generate chart' });
  }
};
