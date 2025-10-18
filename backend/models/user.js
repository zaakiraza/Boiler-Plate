import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic user information
    userName: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },

    // Personal information
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    bloodGroup: { type: String },

    // Contact information
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String }
    },

    // Emergency contacts
    emergencyContacts: [{
      name: { type: String },
      relationship: { type: String },
      phone: { type: String },
      email: { type: String }
    }],

    // Health information
    healthInfo: {
      conditions: [{ type: String }],
      medications: [{
        name: { type: String },
        dosage: { type: String },
        frequency: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
      }],
      allergies: [{ type: String }],
      bloodPressure: {
        systolic: { type: Number },
        diastolic: { type: Number },
        lastChecked: { type: Date }
      },
      weight: {
        value: { type: Number },
        unit: { type: String, enum: ["kg", "lbs"], default: "kg" },
        lastUpdated: { type: Date }
      },
      height: {
        value: { type: Number },
        unit: { type: String, enum: ["cm", "ft"], default: "cm" },
        lastUpdated: { type: Date }
      }
    },

    // Insurance information
    insurance: {
      provider: { type: String },
      policyNumber: { type: String },
      validUntil: { type: Date }
    },

    // References to other models
    familyMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "FamilyMember"
    }],
    healthRecords: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthRecord"
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual population for family members
userSchema.virtual('familyMembersData', {
  ref: 'FamilyMember',
  localField: 'familyMembers',
  foreignField: '_id'
});

// Virtual population for health records
userSchema.virtual('healthRecordsData', {
  ref: 'HealthRecord',
  localField: 'healthRecords',
  foreignField: '_id'
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ userName: 1 });

const User = mongoose.model("User", userSchema);
export default User;
