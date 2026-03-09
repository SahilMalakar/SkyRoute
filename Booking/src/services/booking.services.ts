import status from "http-status";
import { AppError } from "../utils/AppError.js";
import axios from "axios";
import { prisma } from "../db/index.js";
import { config } from "../config/config.js";
import type { CreateBookingBody } from "../validations/zod.validation.js";

export async function createBookingService(
  id: number,
  data: CreateBookingBody,
) {
  try {
    console.log("calling flight service");

    const flightResponse = await axios.get(
      `${config.flight_service_url}/api/v1/flights/${id}`,
    );
    console.log("flightResponse.data:", flightResponse.data);
    // your flight service returns { success, data }
    const flight = flightResponse.data.data;
    console.log("flight:", flight);

    if (!flight) {
      throw new AppError("Flight not found", status.NOT_FOUND);
    }

    if (flight.totalSeats < data.noOfSeats) {
      throw new AppError("Not enough seats available", status.BAD_REQUEST);
    }

    console.log("starting transaction");

    const result = await prisma.$transaction(
      async (tx) => {
        // Step 1: create booking
        const newBooking = await tx.booking.create({
          data: {
            flightId: id,
            userId: data.userId,
            noOfSeats: data.noOfSeats,
            status: "PENDING",
            totalCost: Number(flight.price) * data.noOfSeats,
          },
        });

        // Step 2: decrement seats in flight service
        await axios.patch(
          `${config.flight_service_url}/api/v1/flights/${id}/seats`,
          {
            seats: data.noOfSeats,
            dec: true,
          },
        );

        // Step 3: confirm booking
        const updatedBooking = await tx.booking.update({
          where: { id: newBooking.id },
          data: { status: "CONFIRMED" },
        });

        return updatedBooking;
      },
      {
        maxWait: 10000,
        timeout: 10000,
      },
    );

    console.log("end of transaction");
    console.log("result : ", result);

    return result;
  } catch (error) {
    console.error("Booking service error:", error);
    throw error;
  }
}
