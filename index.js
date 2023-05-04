const express = require('express');
const cors = require('cors');
const mssql = require('mssql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbServer = process.env.DB_SERVER;
const dbDatabase = process.env.DB_DATABASE;


// Replace these with your actual database credentials
const config = {
  user: dbUsername ,
  password: dbPassword,
  server: dbServer,
  database: dbDatabase,
};

app.use(cors());

app.get('/api/faqs', async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool.request().query('SELECT * FROM FAQs');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error retrieving FAQs: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
