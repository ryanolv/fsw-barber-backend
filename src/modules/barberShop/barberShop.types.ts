import { BarberShop } from "@prisma/client";
import { CreateBarberShopInput } from "./barberShop.validation";

export type BarberShopDTO = BarberShop;
export type CreateBarberShopDTO = CreateBarberShopInput;

export interface IBarberShopRepository {
  findRecentlyAdded(limit: number): Promise<BarberShopDTO[]>;
  create(data: CreateBarberShopDTO): Promise<BarberShopDTO>;
  findById(id: string): Promise<BarberShopDTO | null>;
}

export interface IBarberShopService {
  getRecentlyAddedBarberShops(): Promise<BarberShopDTO[]>;
  createNewBarberShop(data: CreateBarberShopDTO): Promise<BarberShopDTO>;
}
