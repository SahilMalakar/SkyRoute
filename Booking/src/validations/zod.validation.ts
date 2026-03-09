import { z } from "zod";

export const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createBookingBodySchema = z.object({
  userId: z.number().int().positive(),
  noOfSeats: z.number().int().positive().max(10),
});

export type CreateBookingBody = z.infer<typeof createBookingBodySchema>;
