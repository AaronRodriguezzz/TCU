const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    type: {
        type: String, 
        enum: ['BS', 'TECH']
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    years: {
        type: Number,
        default: 4   
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
