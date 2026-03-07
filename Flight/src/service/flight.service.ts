import status from "http-status";
import { AppError } from "../utils/AppError.js";
import FlightRepository from "../repositories/flight-respository.js";
import type {
  CreateFlightInput,
  flightQueryInput,
} from "../validations/zod.validation.js";
import type { Prisma } from "../db/generated/prisma/client.js";

const flightRepository = new FlightRepository();

export async function createFlight(data: CreateFlightInput) {
  try {
    return await flightRepository.create(data);
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Cannot create a new Flight",
      status.INTERNAL_SERVER_ERROR,
    );
  }
}

// had to amke this filter more robust
export async function getAllFlightByFilter(query: flightQueryInput) {
  const customFilter: Prisma.FlightWhereInput = {};
  if (query.departureAirportId) {
    customFilter.departureAirportId = query.departureAirportId;
  }

  if (query.arrivalAirportId) {
    customFilter.arrivalAirportId = query.arrivalAirportId;
  }

  if (query.airplaneId) {
    customFilter.airplaneId = query.airplaneId;
  }

  if (query.boardingGate) {
    customFilter.boardingGate = query.boardingGate;
  }

  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    customFilter.price = {};

    if (query.minPrice !== undefined) {
      customFilter.price.gte = query.minPrice;
    }

    if (query.maxPrice !== undefined) {
      customFilter.price.lte = query.maxPrice;
    }
  }

  if (query.startDate || query.endDate) {
    customFilter.departureTime = {};

    if (query.startDate) {
      customFilter.departureTime.gte = query.startDate;
    }

    if (query.endDate) {
      customFilter.departureTime.lte = query.endDate;
    }
  }
  console.log(`service layer , customFilter : ${JSON.stringify(customFilter)}`);

  try {
    return await flightRepository.getAllFlights(customFilter);
  } catch (error) {
    console.log(`service layer , error : ${error}`);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Cannot filter Flights", status.INTERNAL_SERVER_ERROR);
  }
}

// export async function getFlight() {
//   try {
//     return await flightRepository.findAll();
//   } catch (error: unknown) {
//     if (error instanceof AppError) {
//       throw error;
//     }

//     throw new AppError("Cannot fetch Flights", status.INTERNAL_SERVER_ERROR);
//   }
// }

// export async function getFlightById(id: number) {
//   try {
//     return await flightRepository.findById(id);
//   } catch (error: unknown) {
//     if (error instanceof AppError) {
//       throw new AppError(
//         "This Flight you requested is not present",
//         status.NOT_FOUND,
//       );
//     }

//     throw new AppError(
//       "Cannot fetch this Flight",
//       status.INTERNAL_SERVER_ERROR,
//     );
//   }
// }

// export async function deleteFlightById(id: number) {
//   try {
//     return await flightRepository.deleteById(id);
//   } catch (error: unknown) {
//     console.log(`delete error : ${error}`);

//     if (error instanceof AppError) {

//       if (error.statusCode === status.NOT_FOUND) {
//         throw new AppError("Flight does not exist", status.NOT_FOUND);
//       }

//       if (error.statusCode === status.BAD_REQUEST) {
//         throw new AppError(
//           "Flight cannot be deleted because flights are associated with it",
//           status.BAD_REQUEST,
//         );
//       }
//     }

//     throw new AppError(
//       "Cannot delete this Flight",
//       status.INTERNAL_SERVER_ERROR,
//     );
//   }
// }

// export async function updateFlightById(
//   id: number,
//   data: any,
// ) {
//   try {
//     return await flightRepository.updateById(id, data);
//   } catch (error: unknown) {
//     if (error instanceof AppError) {
//       throw new AppError("Requested airplane does not exist", status.NOT_FOUND);
//     }

//     throw new AppError("Cannot update airplane", status.INTERNAL_SERVER_ERROR);
//   }
// }
