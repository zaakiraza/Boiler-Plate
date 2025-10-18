import express from "express";
import { authenticateToken } from "../middleware/authentication.js";
import { familyMemberController } from "../controllers/familyMemberController.js";

const familyMemberRouter = express.Router();

// All routes require authentication
familyMemberRouter.use(authenticateToken);

// Get all family members
familyMemberRouter.get("/", familyMemberController.getAllFamilyMembers);

// Get specific family member
familyMemberRouter.get("/:id", familyMemberController.getFamilyMemberById);

// Create new family member
familyMemberRouter.post("/", familyMemberController.createFamilyMember);

// Update family member
familyMemberRouter.put("/:id", familyMemberController.updateFamilyMember);

// Delete family member
familyMemberRouter.delete("/:id", familyMemberController.deleteFamilyMember);

export default familyMemberRouter;
