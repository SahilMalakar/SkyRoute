import { Router } from "express";
import { validateRequest } from "../../middlewares/validator.middlwares.js";
import { createFlightSchema } from "../../validations/zod.validation.js";
import { createFlightController } from "../../controllers/flight.controllers.js";

const flightRouter:Router = Router();

flightRouter.post("/flights",
    validateRequest(createFlightSchema),
    createFlightController
)

export { flightRouter };