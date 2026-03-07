import type { Request, Response } from "express";
import status from "http-status";
import {
  createFlight,
  getAllFlightByFilter,
} from "../service/flight.service.js";
import { successResponse } from "../utils/commonSuccess.js";
import { AppError } from "../utils/AppError.js";
import { errorResponse } from "../utils/commonError.js";

// POST : /flights
export async function createFlightController(req: Request, res: Response) {
  try {
    const Flight = await createFlight(req.body);

    return res
      .status(status.CREATED)
      .json(successResponse(Flight, "Flight created successfully"));
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
// GET : /flights?.....
export async function getAllFlightByFilterController(
  req: Request,
  res: Response,
) {
  const query = (req as any).validatedQuery;

  console.log(`controller layer , query : ${JSON.stringify(query)}`);

  try {
    const flight = await getAllFlightByFilter(query);

    return res.status(status.CREATED).json(successResponse(flight));
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
