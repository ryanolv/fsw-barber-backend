import prisma from "../../prisma/client";
import { IServiceRepository, ServiceDTO, CreateServiceDTO } from "./service.types";

export class ServiceRepository implements IServiceRepository {
  async create(data: CreateServiceDTO): Promise<ServiceDTO> {
    const newService = await prisma.service.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        image_url: data.image_url,
        barberShopId: data.barberShopId,
      },
    });
    return newService;
  }
}
