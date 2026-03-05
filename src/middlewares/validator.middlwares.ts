import { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import status from "http-status";
import { errorResponse } from "../utils/commonError.js";

export const validateRequest =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return (
        res
          .status(status.BAD_REQUEST)
          .json(errorResponse(`Validation failed`, result.error.issues)),
        (req.body = result.data)
      );
      next();
    }
  };
