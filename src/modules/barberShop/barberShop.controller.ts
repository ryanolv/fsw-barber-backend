import { Request, Response, NextFunction } from "express";
import { BarberShopService } from "./barberShop.service";
import { IBarberShopService } from "./barberShop.types";
import { createBarberShopSchema, CreateBarberShopInput } from "./barberShop.validation";

export class BarberShopController {
  private barberShopService: IBarberShopService;

  constructor(barberShopService: IBarberShopService = new BarberShopService()) {
    this.barberShopService = barberShopService;
  }

  public getRecentlyAdded = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const barberShops = await this.barberShopService.getRecentlyAddedBarberShops();
      res.status(200).json(barberShops);
    } catch (error) {
      next(error);
    }
  };

  public createNewBarberShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validationResult = await createBarberShopSchema.safeParseAsync(req.body);

      if (!validationResult.success) {
        res.status(400).json({ errors: validationResult.error.format() });
        return;
      }

      const validatedData = validationResult.data as CreateBarberShopInput;
      const newBarberShop = await this.barberShopService.createNewBarberShop(validatedData);

      res.status(201).json(newBarberShop);
    } catch (error) {
      next(error);
    }
  };
}
