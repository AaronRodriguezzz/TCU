import mongoose from "mongoose";
import bcrypt from "bcrypt";


const adminSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enums: ["Coordinator", "Registrar Administrator"],
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  }
}, { timestamps: true });

adminSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

adminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model("Admin", adminSchema);
