import User from "../models/user.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select(
        "-password -v -updatedAt -createdAt -isAdmin -otpExpiresAt -otp"
      );
      return successResponse(
        res,
        200,
        "Users fetched successfully",
        { users },
        true
      );
    } catch (error) {
      return errorResponse(res, 500, "Failed to fetch users", {
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(userId);
      const user = await User.findById(userId).select(
        "-password -v -updatedAt -createdAt -isAdmin -otpExpiresAt -otp"
      );

      if (!user) {
        return errorResponse(res, 404, "User not found");
      }

      return successResponse(res, 200, "User fetched successfully", { user });
    } catch (error) {
      return errorResponse(res, 500, "Failed to fetch user", {
        error: error.message,
      });
    }
  },

  // Get user profile
  getUserProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId)
        .select(
          "-password -v -updatedAt -createdAt -isAdmin -otpExpiresAt -otp"
        )
        .populate({
          path: "resumes.resumeId",
          select: "title status lastModified downloadCount",
        });

      if (!user) {
        return errorResponse(res, 404, "User not found");
      }

      // Calculate profile completion
      const profileCompletion = user.calculateProfileCompletion();
      await user.save();

      successResponse(
        res,
        200,
        "User profile fetched successfully",
        { user },
        true
      );
    } catch (error) {
      console.error("Get User Profile Error:", error);
      errorResponse(res, 500, "Failed to fetch user profile", {
        error: error.message,
      });
    }
  },

  // Update user profile
  updateUserProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const updates = req.body;

      // Remove sensitive fields from updates
      delete updates.password;
      delete updates.email;
      delete updates.isAdmin;
      delete updates.verified;
      delete updates.otp;
      delete updates.otpExpiresAt;

      const user = await User.findByIdAndUpdate(
        userId,
        { ...updates },
        { new: true, runValidators: true }
      ).select("-password -otp -otpExpiresAt");

      if (!user) {
        return errorResponse(res, 404, "User not found");
      }

      successResponse(res, 200, "Profile updated successfully", { user }, true);
    } catch (error) {
      console.error("Update User Profile Error:", error);
      errorResponse(res, 500, "Failed to update profile", {
        error: error.message,
      });
    }
  },

  inActiceUser: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }

      user.isActive = false;
      await user.save();

      successResponse(res, 200, "User deleted successfully", { user }, true);
    } catch (error) {
      console.error("Deactivate User Error:", error);
      errorResponse(res, 500, "Failed to deactivate user", {
        error: error.message,
      });
    }
  },
};
