import CrudRepository from "./crud-respository.js";
import { prisma } from "../db/index.js";
import type { Prisma } from "../db/generated/prisma/client.js";
export default class FlightRepository extends CrudRepository<typeof prisma.flight> {
  constructor() {
    super(prisma.flight);
  }

  async getAllFlights(filter:Prisma.FlightWhereInput) {
    const response = await prisma.flight.findMany({
      where: filter,
      select: {
        id: true,
        flightNumber: true,
        departureTime: true,
        arrivalTime: true,
        price: true,
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
            capacity:true
          }
        }
      },
    });
    return response;
  }
}
