import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // Convert URL to file path
const __dirname = path.dirname(__filename);        // Get directory from file path

console.log('Filename:', __filename);
console.log('Directory:', __dirname);

import {
  DATABASE_URL,
  MAX_JSON_SIZE,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./src/config/config.js";
import router from "./src/routes/api.js";
import createHttpError from "http-errors";

export const app = express();

// App Use Default Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());

// App Use Limiter
// const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
// app.use(limiter);

// Cache
app.set("etag", WEB_CACHE);

// Database Connect
mongoose
  .connect(DATABASE_URL, { autoIndex: true })
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch(() => {
    console.log("FAILED TO CONNECT DATABASE");
  });

app.use("/api/v1", router);
app.use(express.static("client/dist"));



// Serve the Vite-built index.html for all other routes (single-page app fallback)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client','dist', 'index.html'));

});
console.log(path.resolve(__dirname, 'client','dist', 'index.html'))
// Handle server errors
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: "INTERNAL SERVER ERROR",
    error: error.message,
  });
});
