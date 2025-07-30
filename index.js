#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.text()); // Hem text hem JSON desteklesin
app.use(bodyParser.json({ strict: false })); // JSON parse ederken esnek olsun

app.post('/', (req, res) => {
  let incoming;
  try {
    if (typeof req.body === 'string') {
      incoming = JSON.parse(req.body); // Düz string ise JSON'a çevirmeyi dene
    } else {
      incoming = req.body; // Zaten obje ise direkt al
    }
  } catch (err) {
    console.warn("Geçersiz JSON yakalandı, ham veri:", req.body);
    return res.json({
      type: "error",
      content: `Geçersiz JSON formatı: ${req.body}`
    });
  }

  console.log("Gelen veri:", incoming);

  res.json({
    type: "text",
    content: `Echo: ${JSON.stringify(incoming)}`
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Echox MCP sunucusu ${PORT} portunda çalışıyor 🛰️`);
});
