import { Router } from "express";
import { BarberShopController } from "./barberShop.controller";
import serviceRoutes from "../service/service.routes";

const router = Router();
const barberShopController = new BarberShopController();

router.get("/recent", barberShopController.getRecentlyAdded);
router.post("/", barberShopController.createNewBarberShop);

router.use("/:barberShopId/services", serviceRoutes);

export default router;
