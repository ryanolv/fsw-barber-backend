import { BarberShop, Service } from "@prisma/client";
import { CreateBarberShopInput } from "./barberShop.validation";

export type BarberShopWithServicesDTO = BarberShop & { services?: Service[] };
export type BarberShopDTO = BarberShop;

export type CreateBarberShopDTO = CreateBarberShopInput;

export interface IBarberShopRepository {
  findRecentlyAdded(limit: number): Promise<BarberShopDTO[]>;
  create(data: CreateBarberShopDTO): Promise<BarberShopDTO>;
  findById(id: string): Promise<BarberShopDTO | null>;
  findByIdWithServices(id: string): Promise<BarberShopWithServicesDTO | null>;
  searchByTitle(searchTerm: string): Promise<BarberShopDTO[]>;
}

export interface IBarberShopService {
  getRecentlyAddedBarberShops(): Promise<BarberShopDTO[]>;
  createNewBarberShop(data: CreateBarberShopDTO): Promise<BarberShopDTO>;
  getBarberShopByIdWithServices(id: string): Promise<BarberShopWithServicesDTO | null>;
  searchBarberShopsByTitle(searchTerm: string): Promise<BarberShopDTO[]>;
}
