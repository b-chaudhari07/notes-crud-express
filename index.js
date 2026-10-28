import { configDotenv } from "dotenv";
import express from "express";
import authRouter from "./routes/authRoutes.js";
import notesRouter from "./routes/notesRoutes.js";
import { logger, globalErrorHandler } from "./middleware/middleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(logger);
app.use("/auth", authRouter);
app.use("/notes", notesRouter);

app.use((req, res) => res.status(404).json({ msg: "Route not found" }));
app.use(globalErrorHandler);

let PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
