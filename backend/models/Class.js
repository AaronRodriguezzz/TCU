import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    subject: {
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
    },
    schoolYear: {
        type: String, 
        required: true
    },
    semester: {
        type: String,
        enum: ["1st", "2nd"],
        required: true
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    }],
    schedule: [{
        day: {
            type: String,
            enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            required: true
        },
        timeStart: String, 
        timeEnd: String   
    }],
    status: {
        type: String, 
        required: true,
        enum: ["On-Going", "Completed"],
        default: "On-Going"
    }
}, { timestamps: true });

export default mongoose.model("Class", classSchema);
