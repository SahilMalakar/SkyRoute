import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} : ${level}: ${message}`;
});

export const logger = createLogger({
  format: combine(
    label({ label: "right meow!" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: `combined.log` }),
  ],
});
