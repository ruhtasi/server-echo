#!/usr/bin/env node
const net = require('net');

const PORT = 8000;
console.error("MCP sunucu başlatılıyor...");

const server = net.createServer((socket) => {
  console.error("Yeni bağlantı alındı.");

  socket.on('data', (data) => {
    console.error("Veri alındı:", data.toString());

    let incoming;
    try {
      incoming = JSON.parse(data.toString());
    } catch (err) {
      console.error("JSON parse hatası:", err.message);
      return;
    }

    // initialize isteği
    if (incoming.method === 'initialize') {
      const response = {
        jsonrpc: "2.0",
        id: incoming.id,
        result: {
          capabilities: {
            echo: true
          }
        }
      };
      socket.write(JSON.stringify(response) + '\r\n');
      console.error("initialize cevabı gönderildi.");
    }

    // echo isteği
    if (incoming.method === 'echo' && incoming.params?.message) {
      const response = {
        jsonrpc: "2.0",
        id: incoming.id,
        result: {
          echoed: incoming.params.message
        }
      };
      socket.write(JSON.stringify(response) + '\r\n');
      console.error("echo cevabı gönderildi.");
    }
  });

  socket.on('end', () => {
    console.error("Bağlantı kapandı.");
  });

  socket.on('error', (err) => {
    console.error("Hata oluştu:", err.message);
  });
});

server.listen(PORT, () => {
  console.error(`MCP sunucu ${PORT} portunda dinleniyor...`);
});
