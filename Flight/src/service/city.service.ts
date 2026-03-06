import status from "http-status";
import CityRepository from "../repositories/city-respository.js";
import { AppError } from "../utils/AppError.js";
import type { CreateCityInput } from "../validations/zod.validation.js";

const cityRespository = new CityRepository();

export async function createCity(data: CreateCityInput) {
  try {
    return await cityRespository.create(data);
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