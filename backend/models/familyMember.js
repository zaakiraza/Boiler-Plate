import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
      enum: [
        "spouse",
        "son",
        "daughter",
        "mother",
        "father",
        "sibling",
        "other",
      ],
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    bloodGroup: {
      type: String,
    },
    avatarColor: {
      type: String,
      default: "#ff4081",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    contact: {
      phone: { type: String },
      email: { type: String },
      address: { type: String },
    },
    emergency: {
      primaryContact: {
        name: { type: String },
        relationship: { type: String },
        phone: { type: String },
      },
      secondaryContact: {
        name: { type: String },
        relationship: { type: String },
        phone: { type: String },
      },
    },
    medicalInfo: {
      healthConditions: [{ type: String }],
      medications: [
        {
          name: { type: String },
          dosage: { type: String },
          frequency: { type: String },
          startDate: { type: Date },
          endDate: { type: Date },
        },
      ],
      allergies: [{ type: String }],
      bloodPressure: {
        systolic: { type: Number },
        diastolic: { type: Number },
        lastChecked: { type: Date },
      },
      weight: {
        value: { type: Number },
        unit: { type: String, enum: ["kg", "lbs"], default: "kg" },
        lastUpdated: { type: Date },
      },
      height: {
        value: { type: Number },
        unit: { type: String, enum: ["cm", "ft"], default: "cm" },
        lastUpdated: { type: Date },
      },
    },
    insurance: {
      provider: { type: String },
      policyNumber: { type: String },
      validUntil: { type: Date },
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
familyMemberSchema.index({ userId: 1 });
familyMemberSchema.index({ name: 1 });
familyMemberSchema.index({ "medicalInfo.healthConditions": 1 });

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);
export default FamilyMember;
