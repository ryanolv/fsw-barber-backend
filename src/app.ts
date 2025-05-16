import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors"; // For Cross-Origin Resource Sharing
import barberShopRoutes from "./modules/barberShop/barberShop.routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

app.use("/api/v1/barbershops", barberShopRoutes); // Mount BarberShop routes

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error Handler:", err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

export default app;
