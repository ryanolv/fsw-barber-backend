import prisma from "../../prisma/client";
import { IBarberShopRepository, BarberShopDTO, CreateBarberShopDTO } from "./barberShop.types";

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
}
