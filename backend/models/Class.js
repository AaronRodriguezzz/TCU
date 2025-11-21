const classSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",  
        required: true
    },
    sectionName: {
        type: String,
        required: true,
        trim: true
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

}, { timestamps: true });

export const ClassSection = mongoose.model("ClassSection", classSchema);
