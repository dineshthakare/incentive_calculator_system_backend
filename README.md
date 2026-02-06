# incentive-_calculator_system_backend

Overview

This backend service powers the Incentive Calculator System for a large car dealership group.
It ingests sales and incentive rule data, applies rule-based incentive logic, and generates incentive results and payroll-ready exports.

The system is designed with scalability, clarity, and extensibility in mind.

Features

CSV ingestion for sales and incentive rules

Rule-based incentive calculation (role & vehicle-based)

Incentive breakdown per employee

Pagination support for large datasets

Payroll CSV export

Clean controller–service architecture (no ORM)

Tech Stack

Node.js

Express.js

PostgreSQL

Multer (file uploads)

CSV Parser

API Endpoints
Method	Endpoint	Description
POST	/upload/sales	Upload sales CSV
POST	/upload/rules	Upload incentive rules CSV
POST	/calculate	Calculate incentives
GET	/results?page=&limit=	Fetch incentive results (paginated)
GET	/export/payroll	Export payroll CSV
Database Setup

PostgreSQL is used as the primary datastore.

Tables include:

sales

structured_rules

incentive_results

SQL schema files are included in the repository.

Design Notes

Business logic is isolated in services for maintainability.

Rule matching is extensible to support ad-hoc or custom incentives in future.

CSV streaming is used to handle large files efficiently.