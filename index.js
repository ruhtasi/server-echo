#!/usr/bin/env node
const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const raw = data.toString();
    try {
      const json = JSON.parse(raw); // Sadece geçerli JSON işlenir
      console.log("Gelen JSON-RPC mesajı:", json);

      const response = {
        jsonrpc: "2.0",
        id: json.id || null,
        result: `Echo MCP yanıtı: ${json.method}`
      };

      socket.write(JSON.stringify(response));
    } catch (err) {
      console.warn("Geçersiz JSON alındı, göz ardı ediliyor:", raw);
      // Buraya düz metin için geri dönüş istersek eklenebilir
    }
  });
});

server.listen(8000, () => {
  console.log("TCP MCP sunucusu 8000 portunda dinliyor 🛰️");
});
