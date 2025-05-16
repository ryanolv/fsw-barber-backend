import { Router } from "express";
import { BarberShopController } from "./barberShop.controller";

const router = Router();
const barberShopController = new BarberShopController(); // Instantiate the controller

router.get("/recent", barberShopController.getRecentlyAdded);
router.post("/", barberShopController.createNewBarberShop);

export default router;
