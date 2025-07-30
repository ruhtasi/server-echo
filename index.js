#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log("Gelen veri:", req.body);
  res.json({
    type: "text",
    content: `Echo: ${JSON.stringify(req.body)}`
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Echo MCP sunucusu ${PORT} portunda çalışıyor.`);
});
