const { executeQuery } = require("../config/db");
const { buildSuccess, buildFailure } = require("./response.service");

const getPayrollExport = async () => {
  try {
    const rows = await executeQuery(
      "SELECT employee_id, total_amount FROM incentive_results"
    );

    return buildSuccess("Payroll data ready", rows);

  } catch (err) {
    console.error("Export error:", err);
    return buildFailure("Failed to fetch payroll export");
  }
};

module.exports = {
  getPayrollExport
}