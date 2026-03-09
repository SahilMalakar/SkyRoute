import { z } from "zod";

console.log(`inside validations`);

export const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// -------------------------Airplane Schema ----------------------------------

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

export const updateAirplaneSchema = createAirplaneSchema.partial();

// -------------------------City Schema ----------------------------------

export const createCitySchema = z.object({
  name: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name cannot exceed 100 characters")
    .trim(),
});

export type CreateCityInput = z.infer<typeof createCitySchema>;

export const updateCitySchema = createCitySchema.partial();

// -------------------------Airport Schema ----------------------------------

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

// -------------------------Flight Schema ----------------------------------

const flightBaseSchema = z.object({
  flightNumber: z
    .string()
    .min(2, "Flight number is too short")
    .max(10)
    .regex(
      /^[A-Z0-9]+$/,
      "Flight number must contain only uppercase letters or numbers",
    ),

  airplaneId: z.coerce
    .number()
    .int("airplaneId must be an integer")
    .positive("airplaneId must be a positive integer"),

  departureAirportId: z.coerce
    .number()
    .int("departureAirportId must be an integer")
    .positive("departureAirportId must be a positive integer"),

  arrivalAirportId: z.coerce
    .number()
    .int("arrivalAirportId must be an integer")
    .positive("arrivalAirportId must be a positive integer"),

  departureTime: z.coerce.date(),

  arrivalTime: z.coerce.date(),

  boardingGate: z.string().min(1, "boardingGate is required").max(10),

  totalSeats: z.coerce
    .number()
    .int("totalSeats must be an integer")
    .positive("totalSeats must be a positive integer"),

  price: z.coerce.number().positive("price must be greater than 0"),
});

export const createFlightSchema = flightBaseSchema
  .refine((data) => data.departureAirportId !== data.arrivalAirportId, {
    message: "Departure and arrival airports cannot be the same",
    path: ["arrivalAirportId"],
  })
  .refine((data) => data.arrivalTime > data.departureTime, {
    message: "Arrival time must be after departure time",
    path: ["arrivalTime"],
  });

export const updateFlightSchema = flightBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  })
  .refine(
    (data) => {
      if (data.arrivalTime && data.departureTime) {
        return data.arrivalTime > data.departureTime;
      }
      return true;
    },
    {
      message: "Arrival time must be after departure time",
      path: ["arrivalTime"],
    },
  );

export type CreateFlightInput = z.infer<typeof createFlightSchema>;
export type UpdateFlightInput = z.infer<typeof updateFlightSchema>;

export const flightQuerySchema = z
  .object({
    departureAirportId: z.coerce.number().int().positive().optional(),
    arrivalAirportId: z.coerce.number().int().positive().optional(),
    airplaneId: z.coerce.number().int().positive().optional(),
    travellers: z.coerce.number().int().positive().optional(),

    price: z
      .string()
      .regex(/^\d+-\d+$/, "Format: min-max (example: 3000-40000)")
      .optional(),

    tripDate: z
      .string()
      .regex(/^\d{8}$/, "Format must be YYYYMMDD")
      .optional(),

    boardingGate: z.string().optional(),

    trips: z
      .string()
      .regex(
        /^([A-Z]{3}-[A-Z]{3})(,[A-Z]{3}-[A-Z]{3})*$/,
        "Format: XXX-YYY or XXX-YYY,AAA-BBB",
      )
      .optional(),

    sort: z
      .string()
      .regex(
        /^((price|departureTime|arrivalTime)_(asc|desc))(,((price|departureTime|arrivalTime)_(asc|desc)))*$/,
        "Format: field_order,field_order (example: price_asc,departureTime_desc)",
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.price) return true;

      // skip refine if regex format is invalid
      if (!/^\d+-\d+$/.test(data.price)) return true;

      const [min, max] = data.price.split("-").map(Number) as [number, number];

      return min <= max;
    },
    {
      message: "max price must be greater than or equal to min price",
      path: ["price"],
    },
  );

export type flightQueryInput = z.infer<typeof flightQuerySchema>;

export const updateRemainingSeatsSchema = z.object({
  seats: z
    .number()
    .int()
    .positive()
    .max(10, "Cannot update more than 10 seats at once"),

  dec: z.boolean().optional().default(true),
});

export type updateRemainingSeatsTypes = z.infer<
  typeof updateRemainingSeatsSchema
>;
