import status from "http-status";
import type { Request, Response } from "express";
import { createBookingService } from "../services/booking.services.js";
import { successResponse } from "../utils/commonSuccess.js";
import { errorResponse } from "../utils/commonError.js";
import { AppError } from "../utils/AppError.js";

export async function BookingFlightController(req: Request, res: Response) {
    const { id } = req.params;
  try {
    const booking = await createBookingService(
        Number(id),
        req.body
    );

    return res
      .status(status.CREATED)
      .json(successResponse(booking, "Flight booked successfully"));
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json(errorResponse(error.message, error));
    }

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong", error));
  }
}