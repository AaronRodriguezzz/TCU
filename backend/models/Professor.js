import mongoose from "mongoose";
import bcrypt from "bcrypt";


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
      password: { type: String }, // make optional to allow updates without changing
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

// Hash password only if modified
professorSchema.pre("save", async function (next) {
  if (!this.isModified("profile.password")) return next();
  if (!this.profile.password) return next();

  const salt = await bcrypt.genSalt(10);
  this.profile.password = await bcrypt.hash(this.profile.password, salt);
  next();
});

export default mongoose.model("Professor", professorSchema);
