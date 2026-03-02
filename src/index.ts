import express from "express";

import { config } from "./config/config.js";
import { logger } from "./config/logger.js";
// import { userRouter } from "./routes/v1/index.js";

const app = express();

// app.use('/api/v1',userRouter)
app.get("/health-check", (req, res) => {
  res.status(200).json({
    msg:"Alive !!"
  })
})

app.listen(config.port, () => {
  console.log(`successfully started the server on port : ${config.port}`);
  logger.info("Successfully started the server","root")
});
