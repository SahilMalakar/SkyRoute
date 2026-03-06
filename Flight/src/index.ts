import express from "express";

import { config } from "./config/config.js";
import { logger } from "./config/logger.js";
import { airplaneRouter } from "./routes/v1/airplane.routes.js";
import { cityRouter } from "./routes/v1/city.routes.js";
// import { userRouter } from "./routes/v1/index.js";

const app = express();

// app.use('/api/v1',userRouter)
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

app.listen(config.port, () => {
  console.log(`successfully started the server on port : ${config.port}`);
  logger.info("Successfully started the server", "root");
});
