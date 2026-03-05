import { Router } from "express";
import { createAirplaneController } from "../../controllers/airplane.controller.js";
import { validateRequest } from "../../middlewares/validator.middlwares.js";
import { createAirplaneSchema } from "../../validations/airplane.validation.js";

const airplaneRouter: Router = Router();

console.log(`inside v1 routes`);

//POST : /api/v1/airplanes
airplaneRouter.post(
  "/airplanes",
  validateRequest(createAirplaneSchema),
  createAirplaneController,
);

export { airplaneRouter };
