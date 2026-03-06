import status from "http-status";
import CityRepository from "../repositories/city-respository.js";
import { AppError } from "../utils/AppError.js";
import type { CreateCityInput } from "../validations/zod.validation.js";

const cityRepository = new CityRepository();

export async function createCity(data: CreateCityInput) {
  try {
    return await cityRepository.create(data);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Cannot create a new city",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

// PATCH city
export async function updateCityById(
  id: number,
  data: Partial<CreateCityInput>,
) {
  try {
    return await cityRepository.updateById(id, data);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw new AppError("Requested city does not exist", status.NOT_FOUND);
    }

    throw new AppError("Cannot update city", status.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteCityById(id: number) {
  try {
    return await cityRepository.deleteById(id);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw new AppError("Requested city does not exist", status.NOT_FOUND);
    }

    throw new AppError("Cannot delete city", status.INTERNAL_SERVER_ERROR);
  }
}