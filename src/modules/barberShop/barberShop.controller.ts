import { Request, Response, NextFunction } from "express";
import { BarberShopService } from "./barberShop.service";
import { IBarberShopService } from "./barberShop.types";

export class BarberShopController {
  private barberShopService: IBarberShopService;

  // Dependency Injection: Inject the service
  constructor(barberShopService: IBarberShopService = new BarberShopService()) {
    this.barberShopService = barberShopService;
  }

  // Using an arrow function to bind `this` correctly if passing method directly to router
  public getRecentlyAdded = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const barberShops = await this.barberShopService.getRecentlyAddedBarberShops();
      res.status(200).json(barberShops);
    } catch (error) {
      // Pass errors to the centralized error handler
      next(error);
    }
  };

  // Add other controller methods here (e.g., getById, create, update, delete)
}
