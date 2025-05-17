import prisma from "../../prisma/client";
import {
  IBarberShopRepository,
  BarberShopDTO,
  CreateBarberShopDTO,
  BarberShopWithServicesDTO,
} from "./barberShop.types";

export class BarberShopRepository implements IBarberShopRepository {
  async findRecentlyAdded(limit: number): Promise<BarberShopDTO[]> {
    const barberShops = await prisma.barberShop.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: limit,
    });
    return barberShops;
  }

  async findById(id: string): Promise<BarberShopDTO | null> {
    const barberShop = await prisma.barberShop.findUnique({
      where: { id },
    });
    return barberShop;
  }

  async findByIdWithServices(id: string): Promise<BarberShopWithServicesDTO | null> {
    return prisma.barberShop.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });
  }

  async create(data: CreateBarberShopDTO): Promise<BarberShopDTO> {
    const newBarberShop = await prisma.barberShop.create({
      data: {
        title: data.title,
        address: data.address,
        phones: data.phones,
        image_url: data.image_url,
        description: data.description,
      },
    });
    return newBarberShop;
  }

  async searchByTitle(searchTerm: string): Promise<BarberShopDTO[]> {
    return prisma.barberShop.findMany({
      where: {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }
}
