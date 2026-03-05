import { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import status from "http-status";
import { errorResponse } from "../utils/commonError.js";

export const validateRequest =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(status.BAD_REQUEST)
        .json(errorResponse("Validation failed", result.error.issues));
    }

    req.body = result.data;
    next();
  };

export const validateParams =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res
        .status(status.BAD_REQUEST)
        .json(errorResponse("Invalid request parameters", result.error.issues));
    }

    req.params = result.data as Request["params"];

    next();
  };
