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

export const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateAirplaneSchema = createAirplaneSchema.partial();

export const createCitySchema = z.object({
  name: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name cannot exceed 100 characters")
    .trim(),
});

export type CreateCityInput = z.infer<typeof createCitySchema>;

export const updateCitySchema = createCitySchema.partial();

export const createAirportSchema = z.object({
  name: z
    .string()
    .min(3, "Airport name must be at least 3 characters")
    .max(120),

  code: z
    .string()
    .length(3, "Airport code must be exactly 3 characters")
    .regex(/^[A-Z]{3}$/, "Airport code must be uppercase like GAU, DEL"),

  address: z.string().min(5, "Address must be at least 5 characters").max(255),

  cityId: z.number().int().positive("cityId must be a positive integer"),
});

export const updateAirportSchema = createAirportSchema.partial();

export type CreateAirportInput = z.infer<typeof createAirportSchema>;
export type UpdateAirportInput = z.infer<typeof updateAirportSchema>;