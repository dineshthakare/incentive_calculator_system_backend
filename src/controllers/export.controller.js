const exportService = require("../services/export.service");

const exportPayroll = async (req, res) => {
  const response = await exportService.getPayrollExport();

  if (response.status === "failure") {
    return res.status(500).json(response);
  }

  let csv = "Employee_ID,Amount\n";
  response.data.forEach(r => {
    csv += `${r.employee_id},${r.total_amount}\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.send(csv);
};

module.exports = {
  exportPayroll
}