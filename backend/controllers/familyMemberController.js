import FamilyMember from "../models/familyMember.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const familyMemberController = {
  // Get all family members for the authenticated user
  getAllFamilyMembers: async (req, res) => {
    try {
      const familyMembers = await FamilyMember.find({
        userId: req.user.userId,
        isActive: true,
      }).sort({ createdAt: -1 });

      return successResponse(
        res,
        200,
        "Family members retrieved successfully",
        familyMembers
      );
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  // Get a specific family member by ID
  getFamilyMemberById: async (req, res) => {
    try {
      const familyMember = await FamilyMember.findOne({
        _id: req.params.id,
        userId: req.user._id,
        isActive: true,
      });

      if (!familyMember) {
        return errorResponse(res, "Family member not found", 404);
      }

      return successResponse(
        res,
        200,
        "Family member retrieved successfully",
        familyMember
      );
    } catch (error) {
      return errorResponse(res, error.message);
    }
  },

  // Create a new family member
  createFamilyMember: async (req, res) => {
    try {
      const {
        name,
        relationship,
        dateOfBirth,
        gender,
        bloodGroup,
        contact,
        emergency,
        medicalInfo,
      } = req.body;

      const familyMember = new FamilyMember({
        userId: req.user.userId,
        name,
        relationship,
        dateOfBirth,
        gender,
        bloodGroup,
        contact,
        emergency,
        medicalInfo,
        avatarColor: req.body.avatarColor || getRandomColor(),
      });

      await familyMember.save();

      return successResponse(
        res,
        201,
        "Family member created successfully",
        familyMember
      );
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  // Update a family member
  updateFamilyMember: async (req, res) => {
    try {
      const familyMember = await FamilyMember.findOne({
        _id: req.params.id,
        userId: req.user._id,
        isActive: true,
      });

      if (!familyMember) {
        return errorResponse(res, 404, "Family member not found");
      }

      const updateFields = [
        "name",
        "relationship",
        "dateOfBirth",
        "gender",
        "bloodGroup",
        "contact",
        "emergency",
        "medicalInfo",
        "insurance",
        "profilePicture",
      ];

      updateFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          familyMember[field] = req.body[field];
        }
      });

      familyMember.lastActivity = new Date();
      await familyMember.save();

      return successResponse(
        res,
        200,
        "Family member updated successfully",
        familyMember
      );
    } catch (error) {
      return errorResponse(res, error.message);
    }
  },

  // Soft delete a family member
  deleteFamilyMember: async (req, res) => {
    try {
      const familyMember = await FamilyMember.findOne({
        _id: req.params.id,
        userId: req.user._id,
        isActive: true,
      });

      if (!familyMember) {
        return successResponse(res, "Family member not found", 404);
      }

      familyMember.isActive = false;
      await familyMember.save();

      return successResponse(res, 200, "Family member deleted successfully");
    } catch (error) {
      return errorResponse(res, error.message);
    }
  },
};

// Helper function to generate random avatar colors
function getRandomColor() {
  const colors = [
    "#ff6b6b",
    "#20c997",
    "#339af0",
    "#ff4081",
    "#7950f2",
    "#ff922b",
    "#51cf66",
    "#5c7cfa",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
