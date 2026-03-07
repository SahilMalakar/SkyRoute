import status from "http-status";
import { AppError } from "../utils/AppError.js";
import type {
  CreateAirportInput,
  UpdateAirportInput,
} from "../validations/zod.validation.js";
import AirportRepository from "../repositories/airport-respository.js";

const airportRepository = new AirportRepository();

console.log("inside service");

export async function createAirport(data: CreateAirportInput) {
  try {
    return await airportRepository.create(data);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Cannot create a new airport",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function getAirport() {
  try {
    return await airportRepository.findAll();
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Cannot fetch airports", status.INTERNAL_SERVER_ERROR);
  }
}

export async function getAirportById(id: number) {
  try {
    return await airportRepository.findById(id);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw new AppError(
        "This airport you requested is not present",
        status.NOT_FOUND,
      );
    }

    throw new AppError(
      "Cannot fetch this airport",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function deleteAirportById(id: number) {
  try {
    return await airportRepository.deleteById(id);
  } catch (error: unknown) {
    console.log(`delete error : ${error}`);

    if (error instanceof AppError) {
      if (error.statusCode === status.NOT_FOUND) {
        throw new AppError("Airport does not exist", status.NOT_FOUND);
      }

      if (error.statusCode === status.BAD_REQUEST) {
        throw new AppError(
          "Airport cannot be deleted because flights are associated with it",
          status.BAD_REQUEST,
        );
      }
    }

    throw new AppError(
      "Cannot delete this airport",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function updateAirportById(id: number, data: UpdateAirportInput) {
  try {
    return await airportRepository.updateById(id, data);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw new AppError("Requested airplane does not exist", status.NOT_FOUND);
    }

    throw new AppError("Cannot update airplane", status.INTERNAL_SERVER_ERROR);
  }
}
