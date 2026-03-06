import type { Request, Response } from "express";

import status from "http-status";
import { createCity, deleteCityById, updateCityById } from "../service/city.service.js";
import { successResponse } from "../utils/commonSuccess.js";
import { AppError } from "../utils/AppError.js";
import { errorResponse } from "../utils/commonError.js";

// POST : /cities
// request body : { model: string, capacity: number }

export async function createCityController(req: Request, res: Response) {
  try {
    const city = await createCity(req.body);

    return res
      .status(status.CREATED)
      .json(successResponse(city, "City created successfully"));
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

// PATCH : /cities/:id
export async function updateCityController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const city = await updateCityById(Number(id), req.body);

    return res
      .status(status.OK)
      .json(successResponse(city, "City updated successfully"));
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

// DELETE : /cities/:id
export async function deleteCityByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const city = await deleteCityById(Number(id));

    return res
      .status(status.OK)
      .json(successResponse(city, "City deleted successfully"));
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