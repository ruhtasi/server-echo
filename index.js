#!/usr/bin/env node
const net = require('net');

const server = net.createServer(socket => {
  socket.on('data', data => {
    try {
      const msg = JSON.parse(data.toString());

      // Gelen method "echo" ise, içeriği direkt result olarak döner
      if (msg.method === "echo") {
        const response = {
          jsonrpc: "2.0",
          id: msg.id || 0,
          result: msg.params?.text || ""
        };
        socket.write(JSON.stringify(response));
      } else {
        // Bilinmeyen method için boş result döner
        const response = {
          jsonrpc: "2.0",
          id: msg.id || 0,
          result: ""
        };
        socket.write(JSON.stringify(response));
      }
    } catch (err) {
      console.error('Parse hatası:', err);
    }
  });

  socket.on('end', () => {
    console.error('Client bağlantısı kapandı.');
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.error(`Echo MCP sunucusu port ${PORT} üzerinden çalışıyor.`);
});
