import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    subject: {
        subjectCode: {
            type: String,
            required: true,
            trim: true   // removed unique:true
        },
        subjectName: {
            type: String,
            required: true
        },
        units: {
            type: Number,
            required: true
        }
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

    // ⭐ FIXED ARRAY FORMAT
    enrolledStudents: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
                required: true
            },
            attendance: {
                absentCount: {
                    type: Number,
                    default: 0
                },
                presentCount: {
                    type: Number,
                    default: 0
                }
            },
            exams: {
                midTerm: {
                    type: Number,
                    default: 0
                },
                finals: {
                    type: Number,
                    default: 0
                }
            }
        }
    ],

    schedule: [
        {
            day: {
                type: String,
                enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                required: true
            },
            timeStart: {
                type: String,
                required: true
            },
            timeEnd: {
                type: String,
                required: true
            }
        }
    ],

    status: {
        type: String,
        enum: ["On-Going", "Completed"],
        default: "On-Going"
    },

    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",
        required: true
    }

}, { timestamps: true });

export default mongoose.model("Class", classSchema);
