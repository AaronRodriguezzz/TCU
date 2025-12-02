import Student from "../../models/Student.js";
import mongoose from "mongoose";
import sendResponse from "../../utils/sendResponse.js";
import ClassSection from "../../models/Class.js";

/**
 * CREATE STUDENT
 */
export const createStudent = async (req, res) => {

  try {
    const requiredFields = [
      "studentId", "fullName", "email", "password", "gender",
      "birthDate", "contactNumber", "address", "course",
      "section", "yearLevel", "status"
    ];

    // Check all required fields
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return sendResponse(res, 400, false, null, `${field} is required`);
      }
    }

    const studentExists = await Student.findOne({ studentId: req.body.studentId });

    if (studentExists) {
      return sendResponse(res, 409, false, null, "Student with this ID already exists");
    }

    const student = await Student.create(req.body);
    return sendResponse(res, 201, true, student, "Student created successfully");
  } catch (err) {
    console.error("Create student error:", err);
    return sendResponse(res, 500, false, null, "Failed to create student");
  }
};

/**
 * GET ALL STUDENTS
 * Supports optional pagination: ?page=1&limit=10
 */
export const getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100; // default max 100
    const skip = (page - 1) * limit;

    console.log("Fetching students with pagination:", { page, limit, skip });
    const students = await Student.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments();

    return sendResponse(res, 200, true, { students, total, page, limit }, "Students fetched successfully");
  } catch (err) {
    console.error("Get students error:", err);
    return sendResponse(res, 500, false, null, "Failed to fetch students");
  }
};

export const getUnenrolledStudents = async (req,res) => {
  const classId = req.params.id;

  try {
    const classSection = await ClassSection.findById(classId);

    if (!classSection) {
      throw new Error("Class not found");
    }

    const enrolledStudentIds = classSection.enrolledStudents.map(
      (entry) => entry.student.toString()
    );
    const students = await Student.find({
      _id: { $nin: enrolledStudentIds },
      department: req.query.department
    });

    return sendResponse(res, 200, true, students, "Student fetched successfully");
  } catch (err) { 
    console.error("Get unenrolled students error:", err);
    throw err;
  }
};

/**
 * GET SINGLE STUDENT
 */
export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, "Invalid student ID");
    }

    const student = await Student.findById(id);
    if (!student) return sendResponse(res, 404, false, null, "Student not found");

    return sendResponse(res, 200, true, student, "Student fetched successfully");
  } catch (err) {
    console.error("Get student error:", err);
    return sendResponse(res, 500, false, null, "Failed to fetch student");
  }
};

/**
 * UPDATE STUDENT
 */
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, "Invalid student ID");
    }

    // 🔥 Prevent blank password overwrite
    if (!req.body.password || req.body.password.trim() === "") {
      delete req.body.password;
    }

    const updated = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return sendResponse(res, 404, false, null, "Student not found");
    }

    return sendResponse(res, 200, true, updated, "Student updated successfully");
  } catch (err) {
    console.error("Update student error:", err);
    return sendResponse(res, 500, false, null, "Failed to update student");
  }
};


/**
 * DELETE STUDENT
 */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, "Invalid student ID");
    }

    const deleted = await Student.findByIdAndDelete(id);

    if (!deleted) return sendResponse(res, 404, false, null, "Student not found");

    return sendResponse(res, 200, true, deleted, "Student deleted successfully");
  } catch (err) {
    console.error("Delete student error:", err);
    return sendResponse(res, 500, false, null, "Failed to delete student");
  }
};
