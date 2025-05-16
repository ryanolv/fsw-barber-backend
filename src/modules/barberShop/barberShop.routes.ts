import { Router } from "express";
import { BarberShopController } from "./barberShop.controller";

const router = Router();
const barberShopController = new BarberShopController(); // Instantiate the controller

// Define routes for BarberShop
router.get("/recent", barberShopController.getRecentlyAdded);

// Example for other routes you might add:
// router.get('/:id', barberShopController.getBarberShopById);
// router.post('/', barberShopController.createBarberShop);

export default router;
