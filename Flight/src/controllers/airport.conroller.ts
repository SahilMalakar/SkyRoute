import type { Request, Response } from "express";
import {
  createAirport,
  deleteAirportById,
  getAirport,
  getAirportById,
  updateAirportById,
} from "../service/airport.service.js";
import status from "http-status";
import { successResponse } from "../utils/commonSuccess.js";
import { AppError } from "../utils/AppError.js";
import { errorResponse } from "../utils/commonError.js";

// POST : /airports
export async function creatAirportController(req: Request, res: Response) {
  try {
    const airport = await createAirport(req.body);

    return res
      .status(status.CREATED)
      .json(successResponse(airport, "Airport created successfully"));
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

// GET : /airports
export async function getAirportController(req: Request, res: Response) {
  try {
    const airport = await getAirport();

    return res
      .status(status.OK)
      .json(successResponse(airport, "Airports fetched successfully"));
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

// GET : /airports/:id
export async function getAirportByIdController(req: Request, res: Response) {
  try {
    const airport = await getAirportById(Number(req.params.id));

    return res
      .status(status.OK)
      .json(successResponse(airport, "Airport fetched successfully"));
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

// DELETE : /airports/:id
export async function deleteAirportByIdController(req: Request, res: Response) {
  try {
    const airport = await deleteAirportById(Number(req.params.id));

    return res
      .status(status.OK)
      .json(successResponse(airport, "Airport deleted successfully"));
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

// PATCH : /airports/:id
export async function updateAirportByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const airport = await updateAirportById(Number(id), req.body);

    return res
      .status(status.OK)
      .json(successResponse(airport, "Airport updated successfully"));
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
