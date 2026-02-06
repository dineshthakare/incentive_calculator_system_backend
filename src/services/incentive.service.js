const { executeQuery } = require("../config/db");
const { buildSuccess, buildFailure } = require("./response.service");

const calculateIncentives = async () => {
  try {
    const sales = await executeQuery(`
      SELECT employee_id, role, vehicle_type, SUM(quantity) AS units
      FROM sales
      GROUP BY employee_id, role, vehicle_type
    `);

    console.log('Sales data: ', sales);
        if (!sales.length) {
      return buildFailure("No sales data uploaded. Please upload sales file first.");
    }
    const rules = await executeQuery(`SELECT * FROM structured_rules`);

  console.log('Rules data: ', rules);

     if (!rules.length) {
      return buildFailure("No rules data uploaded. Please upload rules file first.");
    }

         //Prevent duplicate calculation for the same data
    const existingResults = await executeQuery(`SELECT COUNT(*)::int AS total FROM incentive_results`);
    console.log('Existing results count: ', existingResults[0].total);
    if (existingResults[0].total > 0) {
      return buildFailure("Incentives already calculated. Please clear previous results to recalculate.");
    }

    const incentiveMap = {};
    const breakdown = {};

    for (const sale of sales) {
      const rule = rules.find(r =>
        r.role === sale.role &&
        r.vehicle_type === sale.vehicle_type &&
        sale.units >= r.min_units &&
        sale.units <= r.max_units
      );

      if (!rule) continue;

      const extraUnits = Math.max(0, sale.units - rule.min_units);
      const amount =
        rule.base_incentive + extraUnits * rule.bonus_per_unit;

      incentiveMap[sale.employee_id] =
        (incentiveMap[sale.employee_id] || 0) + amount;

      breakdown[sale.employee_id] = breakdown[sale.employee_id] || [];
      breakdown[sale.employee_id].push({
        vehicleType: sale.vehicle_type,
        units: sale.units,
        ruleId: rule.id,
        amount
      });
    }

    for (const empId in incentiveMap) {
  const empBreakdown = breakdown[empId] || [];
  await executeQuery(
    `INSERT INTO incentive_results (employee_id, total_amount, breakdown)
     VALUES ($1,$2,$3)`,
    [empId, incentiveMap[empId], JSON.stringify(empBreakdown)]
  );
}


    return buildSuccess("Incentives calculated successfully", incentiveMap);

  } catch (err) {
    console.error("Incentive calculation error:", err);
    return buildFailure("Error calculating incentives");
  }
};

const getResults = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    // total count
    const countResult = await executeQuery(
      `SELECT COUNT(*)::int AS total FROM incentive_results`
    );
    const totalRecords = countResult[0].total;

    // paginated data
    const results = await executeQuery(
      `
      SELECT *
      FROM incentive_results
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    return buildSuccess("Incentive results fetched successfully", {
      items: results,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit)
      }
    });

  } catch (err) {
    console.error("Fetch results error:", err);
    return buildFailure("Error fetching incentive results");
  }
};


module.exports = {
  calculateIncentives,
  getResults
}