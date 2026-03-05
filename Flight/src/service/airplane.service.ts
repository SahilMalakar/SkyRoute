import status from "http-status";
import AirplaneRepository from "../repositories/airplane-respository.js";
import { AppError } from "../utils/AppError.js";
import type { CreateAirplaneInput } from "../validations/airplane.validation.js";

// all business logic related to airplane will be here
const airplaneRepository = new AirplaneRepository();

console.log(`inside service`);

export async function createAirplane(data: CreateAirplaneInput) {
  try {
    return await airplaneRepository.create(data);
  } catch (error: any) {
    if (error.name === "TypeError") {
      throw new AppError(
        "Cannot create a new Airplane object",
        status.INTERNAL_SERVER_ERROR,
      );
    }

    throw error;
  }
}

export async function getAirplane() {
  try {
    return await airplaneRepository.findAll();
  } catch (error: any) {
    throw new AppError(
      "Cannot fetch data of all airplanes",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function getAirplaneById(id: number) {
  try {
    return await airplaneRepository.findById(id);
  } catch (error: any) {
    if (error.statusCode === status.NOT_FOUND) {
      throw new AppError(
        "This airplane u requested is not present",
        status.NOT_FOUND,
      );
    }
    throw new AppError(
      "Cannot fetch data of this airplanes",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function deleteAirplaneById(id: number) {
    try {
      return await airplaneRepository.deleteById(id);
    } catch (error: any)  {
      if (error instanceof AppError && error.statusCode === status.NOT_FOUND) {
        throw new AppError(
          "This airplane you requested to delete is not present",
          status.NOT_FOUND,
        );
      }

      throw new AppError(
        "Cannot delete data of this airplane",
        status.INTERNAL_SERVER_ERROR,
      );
    }
}