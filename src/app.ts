import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import barberShopRoutes from "./modules/barberShop/barberShop.routes";
import { ApiError } from "./core/errors/ApiError";

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

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default app;
