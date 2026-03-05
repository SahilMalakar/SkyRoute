import { z } from "zod";

console.log(`inside validations`);

// A runtime validator.
// It checks data when the program runs
export const createAirplaneSchema = z.object({
  model: z.string().min(2, "Model must be at least 2 characters"),
  capacity: z
    .number()
    .int()
    .positive()
    .max(1000, "Capacity cannot exceed 1000"),
});

// This is compile-time only.
// It disappears after TypeScript compiles.
export type CreateAirplaneInput = z.infer<typeof createAirplaneSchema>;
