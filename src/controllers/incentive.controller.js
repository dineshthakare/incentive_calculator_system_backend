const incentiveService = require("../services/incentive.service");
const { sendResponse } = require("../services/response.service");

const calculateIncentives = async (req, res) => {
  const response = await incentiveService.calculateIncentives();
  return sendResponse(res, response);
};

const getResults = async (req, res) => {
   const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const response = await incentiveService.getResults(page, limit);
  return sendResponse(res, response);
};


module.exports = {
  calculateIncentives,
  getResults
}