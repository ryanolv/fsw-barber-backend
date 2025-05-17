import { ServiceRepository } from "./service.repository";
import { IServiceService, IServiceRepository, ServiceDTO, CreateServiceDTO } from "./service.types";
import prisma from "../../prisma/client";
import { ApiError } from "../../core/errors/ApiError";
import { IBarberShopRepository } from "../barberShop/barberShop.types";
import { BarberShopRepository } from "../barberShop/barberShop.repository";

export class ServiceService implements IServiceService {
  private serviceRepository: IServiceRepository;
  private barberShopRepository: IBarberShopRepository;

  constructor(
    serviceRepository: IServiceRepository = new ServiceRepository(),
    barberShopRepository: IBarberShopRepository = new BarberShopRepository(),
  ) {
    this.serviceRepository = serviceRepository;
    this.barberShopRepository = barberShopRepository;
  }

  async createNewService(data: CreateServiceDTO): Promise<ServiceDTO> {
    const barberShop = await this.barberShopRepository.findById(data.barberShopId);

    if (!barberShop) {
      throw new ApiError(404, "BarberShop not found. Cannot add service.");
    }

    const newService = await this.serviceRepository.create(data);
    return newService;
  }
}
