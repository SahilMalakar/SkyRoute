import status from "http-status";
import type { Request, Response } from "express";
import { createAirplane } from "../service/airplane.service.js";

// POST : /airplanes
// request body : { model: string, capacity: number }


console.log(`inside controller`);

export async function createAirplaneController(req: Request, res: Response) {
  try {
    console.log(`request body : ${JSON.stringify(req.body)}`);

    const { model, capacity } = req.body;
    if (!model || !capacity) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        data: null,
        message: "Model and capacity are required",
        error: null,
      });
    }

    const newAirplane = await createAirplane({ model, capacity });

    return res.status(status.OK).json({
      success: true,
      data: newAirplane,
      message: "Airplane created successfully",
      error: null,
    });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: null,
      message: "Failed to create airplane",
      error: error,
    });
  }
}
