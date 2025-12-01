import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Schema
const professorSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Professor", "Administrator"],
      default: "Professor",
    },

    profile: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String }, // optional for updates
      employeeId: { type: String, required: true, unique: true },
      department: { type: String, required: true },
      contactNumber: { type: String, required: true },
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// 🔐 Hash the password BEFORE saving
professorSchema.pre("save", async function (next) {
  // Check if password exists and is modified
  if (!this.profile.password || !this.isModified("profile.password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.profile.password = await bcrypt.hash(this.profile.password, salt);
  next();
});

// 🔍 Compare password correctly
professorSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.profile.password);
};

export default mongoose.model("Professor", professorSchema);
