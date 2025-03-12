// backend/controllers/dashboardController.js

const Project = require('../models/Project');
const InventoryItem = require('../models/InventoryItem');

/**
 * Get dashboard summary statistics.
 * Returns total inventory count per project along with other KPIs.
 */
exports.getDashboardSummary = async (req, res) => {
  try {
    // Aggregation to calculate total inventory count per project
    const inventorySummary = await InventoryItem.aggregate([
      {
        $group: {
          _id: "$project", // Group by project id
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);

    // Optionally, you could join the Project collection to get project names
    const summaryWithProjectDetails = await Project.aggregate([
      {
        $lookup: {
          from: "inventoryitems", // Use the collection name as stored in MongoDB (usually lowercase plural)
          localField: "_id",
          foreignField: "project",
          as: "inventoryData"
        }
      },
      {
        $addFields: {
          totalQuantity: { $sum: "$inventoryData.quantity" }
        }
      }
    ]);

    // You can also calculate additional KPIs if needed

    res.json({
      inventorySummary,
      summaryWithProjectDetails
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ error: "Failed to generate dashboard summary" });
  }
};
