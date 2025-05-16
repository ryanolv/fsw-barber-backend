import app from "./app";
import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access it at http://localhost:${PORT}`);
});

// Graceful shutdown (optional but good practice)
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, () => {
    console.log(`\nReceived ${signal}, shutting down gracefully...`);
    server.close(() => {
      console.log("Server closed.");
      // prisma.$disconnect(); // Disconnect Prisma client if you want to ensure it closes connections
      process.exit(0);
    });
  });
});
