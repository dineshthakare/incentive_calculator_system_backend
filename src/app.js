const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();


const corsOptions = {
  origin: ['http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'PATCH',],
  credentials: true,
   allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.errorMessage || 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const routes = require("./routes");
app.use("/api", routes);