import { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import status from "http-status";
import { errorResponse } from "../utils/commonError.js";

export const validateRequest =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`hello from Request middleware :${JSON.stringify(req.body)} `);

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(status.BAD_REQUEST)
        .json(errorResponse("Validation failed", result.error.issues));
    }

    req.body = result.data as Request["body"];
    next();
  };

export const validateParams =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`hello from Params middleware :${JSON.stringify(req.params)} `);
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res
        .status(status.BAD_REQUEST)
        .json(errorResponse("Invalid request parameters", result.error.issues));
    }

    req.params = result.data as Request["params"];

    next();
  };

export const validateQuery =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`hello from Query middleware :${JSON.stringify(req.query)} `);
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res
        .status(status.BAD_REQUEST)
        .json(errorResponse("Validation failed", result.error.issues));
    }

    // Object.assign(req.query, result.data);
    
    // attach parsed query safely
    (req as any).validatedQuery = result.data;
    next();
  };;

// NOTE:
// In Express, `req.query` is implemented as a getter-only property derived from the URL's query string.
// That means we cannot reassign it like `req.query = result.data` because Node's IncomingMessage
// defines it without a setter, which throws:
//
//   TypeError: Cannot set property query of #<IncomingMessage> which has only a getter
//
// However, the object returned by the getter is still mutable. So instead of replacing the
// property, we mutate the existing object using Object.assign(). This preserves Express's
// internal reference while updating the values with our validated + transformed data.
//
// Example transformation:
//   Before validation: req.query = { departureAirportId: "5", minPrice: "4000" }  // strings
//   After validation:  req.query = { departureAirportId: 5,   minPrice: 4000 }     // numbers
//
// This ensures downstream layers (controller → service → repository → Prisma) receive
// properly typed values without breaking Express internals.
