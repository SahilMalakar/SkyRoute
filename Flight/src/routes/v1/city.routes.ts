import { Router } from "express";
import { validateRequest } from "../../middlewares/validator.middlwares.js";
import { createAirplaneSchema, createCitySchema } from "../../validations/zod.validation.js";
import { createCityController } from "../../controllers/city.controllers.js";

const cityRouter:Router = Router();

// POST : /api/v1/cities
cityRouter.post("/cities",
    validateRequest(createCitySchema), createCityController)

export {cityRouter}