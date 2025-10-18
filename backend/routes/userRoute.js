import express from "express";
import { authenticateToken } from "../middleware/authentication.js";
import { admin } from "../middleware/admin.js";
import { userController } from "../controllers/userController.js";

const userRouter = express.Router();

// Admin routes
userRouter.get("/", authenticateToken, admin, userController.getAllUsers);
userRouter.get(
  "/getById/:id",
  authenticateToken,
  admin,
  userController.getById
);

// User profile routes (require authentication)
userRouter.get("/me", authenticateToken, userController.getUserProfile);
userRouter.put("/update", authenticateToken, userController.updateUserProfile);
userRouter.patch("/", authenticateToken, userController.inActiceUser);

export default userRouter;
