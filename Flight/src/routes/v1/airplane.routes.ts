import { Router } from "express";
import {
  createAirplaneController,
  deleteAirplaneByIdController,
  getAirplanesByIdController,
  getAirplanesController,
} from "../../controllers/airplane.controller.js";
import {
  validateParams,
  validateRequest,
} from "../../middlewares/validator.middlwares.js";
import {
  createAirplaneSchema,
  getAirplaneByIdSchema,
} from "../../validations/zod.validation.js";

const airplaneRouter: Router = Router();

console.log(`inside v1 routes`);

//POST : /api/v1/airplanes
airplaneRouter.post(
  "/airplanes",
  validateRequest(createAirplaneSchema),
  createAirplaneController,
);

//GET : /api/v1/airplanes
airplaneRouter.get("/airplanes", getAirplanesController);

//GET : /api/v1/airplanes/:id
airplaneRouter.get(
  "/airplanes/:id",
  validateParams(getAirplaneByIdSchema),
  getAirplanesByIdController,
);

//DELETE : /api/v1/airplanes/:id
airplaneRouter.delete(
  "/airplanes/:id",
  validateParams(getAirplaneByIdSchema),
  deleteAirplaneByIdController,
);
export { airplaneRouter };
