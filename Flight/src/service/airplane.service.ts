import status from "http-status";
import AirplaneRepository from "../repositories/airplane-respository.js";
import { AppError } from "../utils/AppError.js";
import type { CreateAirplaneInput } from "../validations/zod.validation.js";

const airplaneRepository = new AirplaneRepository();

console.log("inside service");

export async function createAirplane(data: CreateAirplaneInput) {
  try {
    return await airplaneRepository.create(data);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Cannot create a new airplane",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function getAirplane() {
  try {
    return await airplaneRepository.findAll();
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Cannot fetch airplanes", status.INTERNAL_SERVER_ERROR);
  }
}

export async function getAirplaneById(id: number) {
  try {
    return await airplaneRepository.findById(id);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw new AppError(
        "This airplane you requested is not present",
        status.NOT_FOUND,
      );
    }

    throw new AppError(
      "Cannot fetch this airplane",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function deleteAirplaneById(id: number) {
  try {
    return await airplaneRepository.deleteById(id);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw new AppError(
        "This airplane you requested to delete is not present",
        status.NOT_FOUND,
      );
    }

    throw new AppError(
      "Cannot delete this airplane",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}
