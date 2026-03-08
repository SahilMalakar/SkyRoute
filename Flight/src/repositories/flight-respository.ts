import CrudRepository from "./crud-respository.js";
import { prisma } from "../db/index.js";
import type { Prisma } from "../db/generated/prisma/client.js";

export default class FlightRepository extends CrudRepository<
  typeof prisma.flight
> {
  constructor() {
    super(prisma.flight);
  }

  async getAllFlights(
    filter: Prisma.FlightWhereInput,
    orderBy?: Prisma.FlightOrderByWithRelationInput[],
  ) {
    const response = await prisma.flight.findMany({
      where: filter,
      ...(orderBy && { orderBy }),
      select: {
        id: true,
        flightNumber: true,
        departureTime: true,
        arrivalTime: true,
        price: true,
        totalSeats: true,
        departureAirport: {
          select: {
            name: true,
            code: true,
            address: true,
          },
        },
        arrivalAirport: {
          select: {
            name: true,
            code: true,
            address: true,
          },
        },
        airplane: {
          select: {
            capacity: true,
          },
        },
      },
    });
    console.log(`response from repo layer : ${JSON.stringify(response)}`);

    return response;
  }
}
