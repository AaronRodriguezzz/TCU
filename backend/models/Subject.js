import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    subjectName: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Subject", subjectSchema);
