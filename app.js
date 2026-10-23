import e from "express";
import morgan from "morgan";

import { router as tourRouter } from "./routes/tourRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

import AppError from "./utils/appError.js";
import { globalErrorHandler } from "./controllers/errorController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = e();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(e.json());
app.use(e.static(`${__dirname}/public`));

// 3) ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("/{*any}", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler); // automatically becomes an error handling middleware (requires 4 parameters)

export default app;
