const fs = require("fs");
const csv = require("csv-parser");
const { executeQuery } = require("../config/db");
const { buildSuccess, buildFailure } = require("./response.service");

const ingestRulesCSV = async (filePath) => {
  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", async (row) => {
          await executeQuery(
            `INSERT INTO structured_rules
             (role, vehicle_type, min_units, max_units, base_incentive, bonus_per_unit, valid_from, valid_to)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [
              row.Role,
              row.Vehicle_Type,
              Number(row.Min_Units),
              Number(row.Max_Units),
              Number(row.Incentive_Amount_INR),
              Number(row.Bonus_Per_Unit_INR),
              row.Valid_From,
              row.Valid_To
            ]
          );
        })
        .on("end", resolve)
        .on("error", reject);
    });

    return buildSuccess("Structured rules uploaded successfully");

  } catch (err) {
    console.error("Rules upload error:", err);
    return buildFailure("Failed to upload structured rules");
  }
};

module.exports = {
ingestRulesCSV
}