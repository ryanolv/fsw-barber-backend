import { BarberShop } from "../../generated/prisma/client";

// Data Transfer Object (DTO) for BarberShop - can be extended if needed
// For now, Prisma's BarberShop type is sufficient for responses.
export type BarberShopDTO = BarberShop;

// Interface for BarberShop Repository
export interface IBarberShopRepository {
  findRecentlyAdded(limit: number): Promise<BarberShopDTO[]>;
  // Add other methods here as the module grows, e.g.:
  // findById(id: string): Promise<BarberShopDTO | null>;
  // create(data: Omit<BarberShopDTO, 'id' | 'created_at' | 'updated_at'>): Promise<BarberShopDTO>;
  // update(id: string, data: Partial<Omit<BarberShopDTO, 'id' | 'created_at' | 'updated_at'>>): Promise<BarberShopDTO | null>;
  // delete(id: string): Promise<boolean>;
}

// Interface for BarberShop Service
export interface IBarberShopService {
  getRecentlyAddedBarberShops(): Promise<BarberShopDTO[]>;
  // Add other methods here, e.g.:
  // getBarberShopById(id: string): Promise<BarberShopDTO | null>;
  // createNewBarberShop(data: Omit<BarberShopDTO, 'id' | 'created_at' | 'updated_at'>): Promise<BarberShopDTO>;
}
