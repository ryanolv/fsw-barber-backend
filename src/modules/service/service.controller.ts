import { Request, Response, NextFunction } from "express";
import { ServiceService } from "./service.service";
import { IServiceService, CreateServiceDTO } from "./service.types";
import { createServiceSchema } from "./service.validation";

export class ServiceController {
  private serviceService: IServiceService;

  constructor(serviceService: IServiceService = new ServiceService()) {
    this.serviceService = serviceService;
  }

  public createNewService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validationResult = await createServiceSchema.safeParseAsync(req);

      if (!validationResult.success) {
        res.status(400).json({ errors: validationResult.error.format() });
        return;
      }

      const serviceData: CreateServiceDTO = {
        ...validationResult.data.body,
        barberShopId: validationResult.data.params.barberShopId,
      };

      const newService = await this.serviceService.createNewService(serviceData);
      res.status(201).json(newService);
    } catch (error) {
      next(error);
    }
  };
}
