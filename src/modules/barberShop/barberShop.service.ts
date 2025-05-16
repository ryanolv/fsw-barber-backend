import { BarberShopRepository } from "./barberShop.repository";
import { IBarberShopService, IBarberShopRepository, BarberShopDTO } from "./barberShop.types";

export class BarberShopService implements IBarberShopService {
  private barberShopRepository: IBarberShopRepository;

  // Dependency Injection: Inject the repository through the constructor
  constructor(barberShopRepository: IBarberShopRepository = new BarberShopRepository()) {
    this.barberShopRepository = barberShopRepository;
  }

  async getRecentlyAddedBarberShops(): Promise<BarberShopDTO[]> {
    // The business logic is simple here: fetch 5 recent barbershops.
    // More complex logic (e.g., checking user permissions, combining data)
    // would go in this service layer.
    const limit = 5;
    return this.barberShopRepository.findRecentlyAdded(limit);
  }

  // Implement other IBarberShopService methods here as needed
}
