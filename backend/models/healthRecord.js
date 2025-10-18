import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    familyMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FamilyMember",
      required: false, // Optional, as record might be for the user themselves
    },
    recordType: {
      type: String,
      required: true,
      enum: ["prescription", "lab_result", "diagnosis", "vaccination", "checkup", "other"],
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachments: [{
      url: { type: String },
      fileType: { type: String },
      fileName: { type: String },
    }],
    doctor: {
      name: { type: String },
      specialization: { type: String },
      contact: { type: String },
    },
    hospital: {
      name: { type: String },
      address: { type: String },
      contact: { type: String },
    },
    notes: { type: String },
    tags: [{ type: String }],
    isArchived: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// Indexes for better query performance
healthRecordSchema.index({ userId: 1, familyMemberId: 1 });
healthRecordSchema.index({ date: -1 });
healthRecordSchema.index({ recordType: 1 });

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);
export default HealthRecord;