import { Router } from "express";
import { validateQuery, validateRequest } from "../../middlewares/validator.middlwares.js";
import { createFlightSchema, flightQuerySchema } from "../../validations/zod.validation.js";
import { createFlightController, getAllFlightByFilterController } from "../../controllers/flight.controllers.js";

const flightRouter:Router = Router();

flightRouter.post("/flights",
    validateRequest(createFlightSchema),
    createFlightController
)
flightRouter.get("/flights",
    validateQuery(flightQuerySchema),
    getAllFlightByFilterController
)
export { flightRouter };