import { Router } from "express";
import { createAirplaneController } from "../../controllers/airplane.controller.js";

const airplaneRouter: Router = Router();

console.log(`inside v1 routes`);

//POST : /api/v1/airplanes
airplaneRouter.post("/airplanes", createAirplaneController);

export { airplaneRouter };
