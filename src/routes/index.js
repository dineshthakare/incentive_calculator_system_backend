const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/upload.controller");
const incentiveController = require("../controllers/incentive.controller");
const exportController = require("../controllers/export.controller");
const upload = require("../config/multer");

router.post(
  "/upload/sales",
  upload.single("file"), 
  uploadController.uploadSales
);

router.post(
  "/upload/rules",
  upload.single("file"), 
  uploadController.uploadRules
);

router.post("/calculate", incentiveController.calculateIncentives);
router.get("/results", incentiveController.getResults);

router.get("/export/payroll", exportController.exportPayroll);

module.exports = router;
