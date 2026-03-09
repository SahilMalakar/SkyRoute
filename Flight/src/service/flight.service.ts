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
  const customFilter: Prisma.FlightWhereInput = {
    AND: [],
  };

  const andFilters = customFilter.AND as Prisma.FlightWhereInput[];

  if (query.trips) {
    const routes = query.trips.split(",");

    andFilters.push({
      OR: routes.map((route) => {
        const [departureCode, arrivalCode] = route.split("-") as [
          string,
          string,
        ];

        return {
          departureAirport: { code: departureCode },
          arrivalAirport: { code: arrivalCode },
        };
      }),
    });
  }

  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-").map(Number) as [
      number,
      number,
    ];

    andFilters.push({
      price: {
        gte: minPrice ? minPrice : 0,
        lte: maxPrice ? maxPrice : 1000000,
      },
    });
  }

  // totalSeats >= travellers
  if (query.travellers !== undefined) {
    andFilters.push({
      totalSeats: {
        gte: query.travellers,
      },
    });
  }

  // a time range covering the whole day.
  if (query.tripDate) {
    const dateStr = query.tripDate;

    const year = Number(dateStr.slice(0, 4));
    const month = Number(dateStr.slice(4, 6)) - 1;
    const day = Number(dateStr.slice(6, 8));

    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    andFilters.push({
      departureTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    });
  }

  let orderBy: Prisma.FlightOrderByWithRelationInput[] | undefined;

  // if two fields contradict logically, the database simply follows priority.
  if (query.sort) {
    const sortFields = query.sort.split(",");

    orderBy = sortFields.map((sortItem) => {
      const [field, direction] = sortItem.split("_") as [
        keyof Prisma.FlightOrderByWithRelationInput,
        "asc" | "desc",
      ];

      return {
        [field]: direction,
      };
    });
  }
  console.log(`service layer , customFilter : ${JSON.stringify(customFilter)}`);

  try {
    return await flightRepository.getAllFlights(customFilter, orderBy);
  } catch (error) {
    console.log(`service layer , error : ${error}`);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Cannot filter Flights", status.INTERNAL_SERVER_ERROR);
  }
}


export async function getFlightById(id:number) {
   try {
     return await flightRepository.findById(id)
   } catch (error: unknown) {
     if (error instanceof AppError) {
       throw error;
     }

     throw new AppError("Cannot fetch flight", status.INTERNAL_SERVER_ERROR);
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
