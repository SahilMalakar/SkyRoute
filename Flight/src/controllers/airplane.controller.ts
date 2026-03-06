import status from "http-status";
import type { Request, Response } from "express";
import {
  createAirplane,
  deleteAirplaneById,
  getAirplane,
  getAirplaneById,
  updateAirplaneById,
} from "../service/airplane.service.js";
import { successResponse } from "../utils/commonSuccess.js";
import { errorResponse } from "../utils/commonError.js";
import { AppError } from "../utils/AppError.js";


// POST : /airplanes
// request body : { model: string, capacity: number }

console.log(`inside controller`);

export async function createAirplaneController(req: Request, res: Response) {
  try {
    const airplane = await createAirplane(req.body);

    return res
      .status(status.CREATED)
      .json(successResponse(airplane, "Airplane created successfully"));
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

// GET : /airplanes
export async function getAirplanesController(req: Request, res: Response) {
  try {
    const airplanes = await getAirplane();

    return res
      .status(status.OK)
      .json(successResponse(airplanes, "Airplanes fetched successfully"));
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

// GET : /airplanes/:id
export async function getAirplanesByIdController(req: Request, res: Response) {
  try {
    const airplane = await getAirplaneById(Number(req.params.id));

    return res
      .status(status.OK)
      .json(successResponse(airplane, "Airplane fetched successfully"));
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

// DELETE : /airplanes/:id
export async function deleteAirplaneByIdController(
  req: Request,
  res: Response,
) {
  try {
    const airplane = await deleteAirplaneById(Number(req.params.id));

    return res
      .status(status.OK)
      .json(successResponse(airplane, "Airplane deleted successfully"));
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



// PATCH : /airplanes/:id

export async function updateAirplaneByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const airplane = await updateAirplaneById(Number(id), req.body);

    return res
      .status(status.OK)
      .json(successResponse(airplane, "Airplane updated successfully"));

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