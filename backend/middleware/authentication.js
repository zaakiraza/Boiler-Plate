import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler.js";

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return errorResponse(res, 401, "Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 403, "Invalid token.");
  }
};
