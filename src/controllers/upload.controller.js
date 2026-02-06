const salesService = require("../services/sales.service");
const rulesService = require("../services/rules.service");
const { sendResponse } = require("../services/response.service");

const uploadSales = async (req, res) => {
  if (!req.file) {
    return sendResponse(
      res,
      buildFailure("No sales CSV file received")
    );
  }

  const response = await salesService.ingestSalesCSV(req.file.path);
  return sendResponse(res, response);
};


const uploadRules = async (req, res) => {
  if (!req.file) {
    return sendResponse(
      res,
      buildFailure("No rules CSV file received")
    );
  }

  const response = await rulesService.ingestRulesCSV(req.file.path);
  return sendResponse(res, response);
};


module.exports = {
  uploadSales,
  uploadRules,
};