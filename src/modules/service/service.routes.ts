import { Router } from "express";
import { ServiceController } from "./service.controller";

const router = Router({ mergeParams: true });
const serviceController = new ServiceController();

router.post("/", serviceController.createNewService);

export default router;
