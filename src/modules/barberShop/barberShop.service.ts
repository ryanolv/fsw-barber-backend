import { BarberShopRepository } from "./barberShop.repository";
import { IBarberShopService, IBarberShopRepository, BarberShopDTO, CreateBarberShopDTO } from "./barberShop.types";

export class BarberShopService implements IBarberShopService {
  private barberShopRepository: IBarberShopRepository;

  constructor(barberShopRepository: IBarberShopRepository = new BarberShopRepository()) {
    this.barberShopRepository = barberShopRepository;
  }

  async getRecentlyAddedBarberShops(): Promise<BarberShopDTO[]> {
    const limit = 5;
    return this.barberShopRepository.findRecentlyAdded(limit);
  }

  async createNewBarberShop(data: CreateBarberShopDTO): Promise<BarberShopDTO> {
    const newBarberShop = await this.barberShopRepository.create(data);
    return newBarberShop;
  }
}
