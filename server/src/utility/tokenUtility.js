import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { JTW_SECRET_KEY } from "../config/config.js";

export const tokenEncode = (payload) => {
  try {
    const options = { expiresIn: "30d" }; // '30d' for 30 days
    return jwt.sign(payload, JTW_SECRET_KEY, options); // Fixing the typo
  } catch (error) {
    throw createHttpError(404, "Failed To Token Encode");
  }
};

export const tokenDecode = (token) => {
  try {
    return jwt.verify(token, JTW_SECRET_KEY);
  } catch (error) {
    return null;
  }
};
