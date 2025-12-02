import ClassSection from "../../models/Class.js";
import Student from "../../models/Student.js";
import sendResponse from "../../utils/sendResponse.js";

// ------------------------------------------------------
// 🔹 Utility: Build dynamic MongoDB filters
// ------------------------------------------------------
const buildFilters = (query) => {
  const filter = {};

  if (query.schoolYear) filter.schoolYear = query.schoolYear;
  if (query.semester) filter.semester = query.semester;
  if (query.status) filter.status = query.status;

  if (query.subjectCode)
    filter["subject.subjectCode"] = { $regex: query.subjectCode, $options: "i" };

  if (query.subjectName)
    filter["subject.subjectName"] = { $regex: query.subjectName, $options: "i" };

  if (query.studentId) filter.enrolledStudents = query.studentId;

  if (query.units) filter["subject.units"] = parseInt(query.units);

  if (query.startDate || query.endDate) {
    filter.createdAt = {};
    if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
    if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
  }

  return filter;
};

export const createClass = async (req, res) => {
  try {
    const { subject } = req.body;

    const existing = await ClassSection.findOne({
      "subject.subjectCode": subject.subjectCode,
    });

    if (existing) {
      return sendResponse(res, 400, false, null, "Subject Code already exists.");
    }

    if (req.body.schedule && req.body.schedule.length > 0) {
      for (const sched of req.body.schedule) {
        if (!sched.day || !sched.timeStart || !sched.timeEnd) {
          return sendResponse(
            res,
            400,
            false,
            null,
            "Invalid schedule format. Missing fields."
          );
        }
      }
    }

    const newClass = await ClassSection.create(req.body);

    return sendResponse(res, 201, true, newClass, "Class created successfully");

  } catch (error) {
    console.error("Create Class Error:", error);
    return sendResponse(res, 500, false, null, "Server error");
  }
};


// ------------------------------------------------------
// 📌 GET ALL CLASSES
// ------------------------------------------------------
export const getClasses = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filter = buildFilters(req.query);

    let sort = { createdAt: -1 };
    if (req.query.sort) {
      const [field, order] = req.query.sort.split(":");
      sort = { [field]: order === "asc" ? 1 : -1 };
    }

    let fields = null;
    if (req.query.fields) fields = req.query.fields.replace(/,/g, " ");

    let query = ClassSection.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(fields);

    if (req.query.populateStudents === "true") {
      query = query.populate("enrolledStudents");
    }

    const classes = await query;
    const total = await ClassSection.countDocuments(filter);

    return sendResponse(res, 200, true, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      filterUsed: filter,
      sortUsed: sort,
      fieldsReturned: fields,
      classes,
    });

  } catch (error) {
    console.error("Get Classes Error:", error);
    return sendResponse(res, 500, false, null, "Failed to fetch classes");
  }
};


// ------------------------------------------------------
// 📌 GET CLASS BY ID
// ------------------------------------------------------
export const getClassById = async (req, res) => {
  try {

    const classSection = await ClassSection.findById(req.params.id).populate(
       "enrolledStudents"
    );

    if (!classSection)
      return sendResponse(res, 404, false, null, "Class not found");

    return sendResponse(res, 200, true, classSection);

  } catch (error) {
    console.error("Get Class Error:", error);
    return sendResponse(res, 500, false, null, "Failed to fetch class");
  }
};


export const getClassByProf = async (req, res) => {
  try {
    const professorId = req.params.professorId;

    const classes = await ClassSection.find({ professor: professorId })

    return sendResponse(res, 200, true, classes);

  } catch (error) {
    console.error("Get Class Error:", error);
    return sendResponse(res, 500, false, null, "Failed to fetch class");
  }
}
// ------------------------------------------------------
// 🔧 UPDATE CLASS
// ------------------------------------------------------
export const updateClass = async (req, res) => {
  try {
    if (req.body.subject?.subjectCode) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Subject Code cannot be updated."
      );
    }

    const updatedClass = await ClassSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("enrolledStudents");

    if (!updatedClass)
      return sendResponse(res, 404, false, null, "Class not found");

    return sendResponse(res, 200, true, updatedClass, "Class updated successfully");

  } catch (error) {
    console.error("Update Class Error:", error);
    return sendResponse(res, 500, false, null, "Failed to update class");
  }
};


// ------------------------------------------------------
// 🗑 DELETE CLASS
// ------------------------------------------------------
export const deleteClass = async (req, res) => {
  try {
    const deletedClass = await ClassSection.findByIdAndDelete(req.params.id);

    if (!deletedClass)
      return sendResponse(res, 404, false, null, "Class not found");

    return sendResponse(res, 200, true, null, "Class deleted successfully");

  } catch (error) {
    console.error("Delete Class Error:", error);
    return sendResponse(res, 500, false, null, "Failed to delete class");
  }
};


// ------------------------------------------------------
// ➕ ENROLL STUDENT
// ------------------------------------------------------
export const enrollStudent = async (req, res) => {
  console.log("Payload:", req.body);

  try {
    const classSection = await ClassSection.findById(req.params.id);
    if (!classSection) {
      return sendResponse(res, 404, false, null, "Class not found");
    }

    // Expecting req.body = array of student IDs
    const studentIds = req.body;

    if (!Array.isArray(studentIds)) {
      return sendResponse(res, 400, false, null, "Invalid payload format. Expected array of student IDs.");
    }

    // Convert student IDs to schema objects
    const newStudents = studentIds.map(id => ({
      student: id,
      attendance: {
        absentCount: 0,
        presentCount: 0
      },
      exams: {
        midTerm: 0,
        finals: 0
      }
    }));

    // Push into array
    classSection.enrolledStudents.push(...newStudents);

    await classSection.save();

    return sendResponse(
      res,
      200,
      true,
      classSection,
      "Students enrolled successfully"
    );

  } catch (error) {
    console.error("Enroll Student Error:", error);
    return sendResponse(res, 500, false, null, "Failed to enroll student");
  }
};


// ------------------------------------------------------
// ➖ REMOVE STUDENT
// ------------------------------------------------------
export const removeStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    const classSection = await ClassSection.findByIdAndUpdate(
      req.params.id,
      { $pull: { enrolledStudents: studentId } },
      { new: true }
    );

    if (!classSection)
      return sendResponse(res, 404, false, null, "Class not found");

    return sendResponse(res, 200, true, classSection, "Student removed successfully");

  } catch (error) {
    console.error("Remove Student Error:", error);
    return sendResponse(res, 500, false, null, "Failed to remove student");
  }
};


// ------------------------------------------------------
// 🕒 UPDATE SCHEDULE
// ------------------------------------------------------
export const updateSchedule = async (req, res) => {
  try {
    const { schedule } = req.body;

    if (!Array.isArray(schedule) || schedule.length === 0) {
      return sendResponse(res, 400, false, null, "Schedule must be an array");
    }

    const updatedClass = await ClassSection.findByIdAndUpdate(
      req.params.id,
      { schedule },
      { new: true }
    );

    if (!updatedClass)
      return sendResponse(res, 404, false, null, "Class not found");

    return sendResponse(res, 200, true, updatedClass, "Schedule updated successfully");

  } catch (error) {
    console.error("Update Schedule Error:", error);
    return sendResponse(res, 500, false, null, "Failed to update schedule");
  }
};
