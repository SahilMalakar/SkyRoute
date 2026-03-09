import express from "express";
import { config } from "./config/config.js";
import { logger } from "./config/logger.js";
import { bookingRouter } from "./routes/v1/booking.routes.js";

const app = express();

app.get("/health-check", (req, res) => {
  res.status(200).json({
    msg: "Alive !!",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`inside root index.ts`);

app.use("/api/v1", bookingRouter);

app.listen(config.port, () => {
  console.log(`successfully started the server on port : ${config.port}`);
  logger.info("Successfully started the server", "root");
});
