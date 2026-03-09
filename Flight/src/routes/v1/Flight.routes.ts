import { Router } from "express";
import { validateParams, validateQuery, validateRequest } from "../../middlewares/validator.middlwares.js";
import { createFlightSchema, flightQuerySchema, IdSchema, updateRemainingSeatsSchema } from "../../validations/zod.validation.js";
import { createFlightController, getAllFlightByFilterController, getFlightsByIdController, updateSeatsController } from "../../controllers/flight.controllers.js";

const flightRouter:Router = Router();

flightRouter.post("/flights",
    validateRequest(createFlightSchema),
    createFlightController
)
flightRouter.get("/flights",
    validateQuery(flightQuerySchema),
    getAllFlightByFilterController
)
flightRouter.get("/flights/:id",
    validateParams(IdSchema),
    getFlightsByIdController
)
flightRouter.patch("/flights/:id/seats",
    validateParams(IdSchema),
    validateRequest(updateRemainingSeatsSchema),
    updateSeatsController
)

export { flightRouter };