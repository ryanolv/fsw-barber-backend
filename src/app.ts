import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors"; // For Cross-Origin Resource Sharing
import barberShopRoutes from "./modules/barberShop/barberShop.routes";

const app: Express = express();

// Core Middleware
app.use(cors()); // Enable CORS for all routes (customize as needed for production)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// API Routes
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

app.use("/api/v1/barbershops", barberShopRoutes); // Mount BarberShop routes

// Global Error Handling Middleware
// This should be defined AFTER all other app.use() and routes calls
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error Handler:", err.stack);
  // Respond with a generic error message
  // In a real application, you might want to send different responses
  // based on the error type (e.g., if it's a custom ApiError with a status code)
  res.status(500).json({
    message: "Internal Server Error",
    // Optionally, include error details in development
    // error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;
