import { Router } from "express";
import { validateParams, validateRequest } from "../../middlewares/validator.middlwares.js";
import { createBookingBodySchema, IdSchema } from "../../validations/zod.validation.js";
import { BookingFlightController } from "../../controllers/Booking.controllers.js";

const bookingRouter: Router = Router();

bookingRouter.post("/bookings/:id",
    validateParams(IdSchema),
    validateRequest(createBookingBodySchema),
    BookingFlightController
)

export { bookingRouter };