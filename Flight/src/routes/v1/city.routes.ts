import { Router } from "express";
import {
  validateParams,
  validateRequest,
} from "../../middlewares/validator.middlwares.js";
import {
  createCitySchema,
  IdSchema,
  updateCitySchema,
} from "../../validations/zod.validation.js";
import {
  createCityController,
  deleteCityByIdController,
  updateCityController,
} from "../../controllers/city.controllers.js";


const cityRouter: Router = Router();

// POST : /api/v1/cities
cityRouter.post(
    "/cities",
    validateRequest(createCitySchema),
    createCityController,
);

// delete : /api/v1/cities
cityRouter.delete(
  "/cities/:id",
  validateParams(IdSchema),
  deleteCityByIdController,
);
cityRouter.patch(
  "/cities/:id",
  validateParams(IdSchema),
  validateRequest(updateCitySchema),
  updateCityController
);

export { cityRouter };
