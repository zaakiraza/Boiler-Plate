import { errorResponse } from "../utils/responseHandler.js";
import User from "../models/user.js";

export const admin = async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (user && user.isAdmin) {
    next();
  } else {
    return errorResponse(res, 403, "Access denied. Admins only.");
  }
};
