#!/usr/bin/env node
const net = require('net');

const server = net.createServer(socket => {
  socket.on('data', data => {
    try {
      const msg = JSON.parse(data.toString());

      if (msg.method === "echo") {
        const response = {
          jsonrpc: "2.0",
          id: msg.id || 0,
          result: msg.params?.text || ""
        };
        socket.write(JSON.stringify(response));
      } else {
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
    server.close(() => {
      console.error('Sunucu kapatıldı. Port serbest bırakıldı.');
    });
  });
});

server.on('error', err => {
  console.error('Sunucu hatası:', err);
  server.close(() => {
    console.error('Sunucu hatadan dolayı kapatıldı. Port serbest.');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.error(`Sunucu port ${PORT} üzerinden dinliyor.`);
});
