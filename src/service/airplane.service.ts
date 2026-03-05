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
