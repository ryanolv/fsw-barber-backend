import { BarberShopRepository } from "./barberShop.repository";
import {
  IBarberShopService,
  IBarberShopRepository,
  BarberShopDTO,
  CreateBarberShopDTO,
  BarberShopWithServicesDTO,
} from "./barberShop.types";
import { ApiError } from "../../core/errors/ApiError";

export class BarberShopService implements IBarberShopService {
  private barberShopRepository: IBarberShopRepository;

  constructor(barberShopRepository: IBarberShopRepository = new BarberShopRepository()) {
    this.barberShopRepository = barberShopRepository;
  }

  async getRecentlyAddedBarberShops(): Promise<BarberShopDTO[]> {
    const limit = 5;
    return this.barberShopRepository.findRecentlyAdded(limit);
  }

  async getBarberShopByIdWithServices(id: string): Promise<BarberShopWithServicesDTO | null> {
    const barberShop = await this.barberShopRepository.findByIdWithServices(id);
    if (!barberShop) {
      throw new ApiError(404, `BarberShop with ID ${id} not found.`);
    }
    return barberShop;
  }

  async searchBarberShopsByTitle(searchTerm: string): Promise<BarberShopDTO[]> {
    if (!searchTerm.trim()) {
      return [];
    }
    return this.barberShopRepository.searchByTitle(searchTerm);
  }

  async createNewBarberShop(data: CreateBarberShopDTO): Promise<BarberShopDTO> {
    const newBarberShop = await this.barberShopRepository.create(data);
    return newBarberShop;
  }
}
