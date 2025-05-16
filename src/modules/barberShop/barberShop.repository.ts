import prisma from "../../prisma/client";
import { BarberShop } from "../../generated/prisma/client";
import { IBarberShopRepository, BarberShopDTO } from "./barberShop.types";

export class BarberShopRepository implements IBarberShopRepository {
  async findRecentlyAdded(limit: number): Promise<BarberShopDTO[]> {
    const barberShops = await prisma.barberShop.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: limit,
      // You might want to include related data here in the future, e.g.:
      // include: { services: true }
    });
    return barberShops;
  }

  // Implement other IBarberShopRepository methods here as needed
  // e.g., findById, create, etc.
}
