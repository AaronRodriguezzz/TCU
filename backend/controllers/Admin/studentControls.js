import Student from "@/models/Student.js";
import bcrypt from "bcrypt";

// CREATE STUDENT
export const createStudent = async (req, res) => {
  try {
    const exists = await Student.findOne({ email: req.body.email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered."
      });
    }

    const student = new Student(req.body);
    await student.save();

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL STUDENTS
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    return res.status(200).json({
      success: true,
      data: students,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE STUDENT
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const existing = await Student.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // If password is updated, hash it manually
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    Object.assign(existing, req.body);
    existing.updatedAt = Date.now();

    await existing.save();

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: existing,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
