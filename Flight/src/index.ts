import express from "express";

import { config } from "./config/config.js";
import { logger } from "./config/logger.js";
import { airplaneRouter } from "./routes/v1/airplane.routes.js";
import { cityRouter } from "./routes/v1/city.routes.js";
import { airportRouter } from "./routes/v1/airport.routes.js";

const app = express();

app.get("/health-check", (req, res) => {
  res.status(200).json({
    msg: "Alive !!",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`inside root index.ts`);

app.use("/api/v1", airplaneRouter);
app.use("/api/v1", cityRouter);
app.use("/api/v1", airportRouter);

app.listen(config.port, () => {
  console.log(`successfully started the server on port : ${config.port}`);
  logger.info("Successfully started the server", "root");
});
