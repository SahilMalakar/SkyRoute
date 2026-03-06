import { Router } from "express";
import { validateParams, validateRequest } from "../../middlewares/validator.middlwares.js";
import { createAirportSchema, IdSchema, updateAirportSchema } from "../../validations/zod.validation.js";
import { creatAirportController, deleteAirportByIdController, getAirportByIdController, getAirportController } from "../../controllers/airport.conroller.js";
import { updateAirplaneByIdController } from "../../controllers/airplane.controller.js";

const airportRouter:Router = Router();

//POST : /api/v1/airports
airportRouter.post("/airports",
    validateRequest(createAirportSchema),
    creatAirportController
)

//GET : /api/v1/airports
airportRouter.get("/airports",
    getAirportController
)

//GET : /api/v1/airports/:id
airportRouter.get("/airports/:id",
    validateParams(IdSchema),
    getAirportByIdController
)

//DELETE : /api/v1/airports/:id
airportRouter.delete("/airports/:id",
    validateParams(IdSchema),
    deleteAirportByIdController
)

//PATCH : /api/v1/airports/:id
airportRouter.patch("/airports/:id",
    validateParams(IdSchema),
    validateRequest(updateAirportSchema),
    updateAirplaneByIdController
)

export {airportRouter}