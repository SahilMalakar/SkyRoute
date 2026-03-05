import status from "http-status";
import type { Request, Response } from "express";
import { createAirplane } from "../service/airplane.service.js";
import { successResponse } from "../utils/commonSuccess.js";
import { errorResponse } from "../utils/commonError.js";
import { AppError } from "../utils/AppError.js";

// POST : /airplanes
// request body : { model: string, capacity: number }

console.log(`inside controller`);

export async function createAirplaneController(req: Request, res: Response) {
  try {
    console.log(`request body : ${JSON.stringify(req.body)}`);

    const newAirplane = await createAirplane(req.body);

    return res
      .status(status.OK)
      .json(successResponse(newAirplane, `Airplane created successfully`));
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json(errorResponse(error.message, error));
    }

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong", error));
  }
}
