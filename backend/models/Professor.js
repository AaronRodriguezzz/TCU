import mongoose from "mongoose";
import bcrypt from "bcrypt";


const professorSchema = new mongoose.Schema({
    professorId: {
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
    department:{
        type: String,
        required: true
    },
    clearance: {
        type: String,
        required: true,
        enum: ['Basic', 'High']
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, { timestamps: true });

professorSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

professorSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model("Professor", professorSchema);
