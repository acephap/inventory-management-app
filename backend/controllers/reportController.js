// backend/controllers/reportController.js

const PDFDocument = require('pdfkit');
const Project = require('../models/Project');
const InventoryItem = require('../models/InventoryItem');

/**
 * Generate a PDF report for a specific project.
 * Fetches the project details and its inventory items,
 * generates a PDF report, and streams it back in the response.
 */
exports.generateProjectReport = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Fetch the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Fetch inventory items associated with this project
    const items = await InventoryItem.find({ project: projectId });

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

    doc.fontSize(16).text('Inventory Items:', { underline: true });
    doc.moveDown();

    if (items.length === 0) {
      doc.fontSize(12).text('No inventory items found for this project.');
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
