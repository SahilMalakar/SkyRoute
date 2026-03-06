import { Router } from "express";
import {
  createAirplaneController,
  deleteAirplaneByIdController,
  getAirplanesByIdController,
  getAirplanesController,
  updateAirplaneByIdController,
} from "../../controllers/airplane.controller.js";
import {
  validateParams,
  validateRequest,
} from "../../middlewares/validator.middlwares.js";
import {
  createAirplaneSchema,
  IdSchema,
  updateAirplaneSchema,
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
airplaneRouter.get("/airplanes",
    getAirplanesController);

//GET : /api/v1/airplanes/:id
airplaneRouter.get(
    "/airplanes/:id",
    validateParams(IdSchema),
    getAirplanesByIdController,
);

//DELETE : /api/v1/airplanes/:id
airplaneRouter.delete(
    "/airplanes/:id",
    validateParams(IdSchema),
    deleteAirplaneByIdController,
);

//PATCH : /api/v1/airplanes/:id
airplaneRouter.patch(
    "/airplanes/:id",
    validateParams(IdSchema),
    validateRequest(updateAirplaneSchema),
    updateAirplaneByIdController,
);
export { airplaneRouter };
