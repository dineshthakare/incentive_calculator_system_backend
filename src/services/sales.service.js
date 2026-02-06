const fs = require("fs");
const csv = require("csv-parser");
const { executeQuery } = require("../config/db");
const { buildSuccess, buildFailure } = require("./response.service");

exports.ingestSalesCSV = async (filePath) => {
  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", async (row) => {
          await executeQuery(
            `INSERT INTO sales
             (employee_id, branch, role, vehicle_type, quantity, sale_date)
             VALUES ($1,$2,$3,$4,$5,$6)`,
            [
              row.Employee_ID,
              row.Branch,
              row.Role,
              row.Vehicle_Type,
              Number(row.Quantity),
              row.Sale_Date
            ]
          );
        })
        .on("end", resolve)
        .on("error", reject);
    });

    return buildSuccess("Sales data uploaded successfully");

  } catch (err) {
    console.error("Sales upload error:", err);
    return buildFailure("Failed to upload sales data");
  }
};
