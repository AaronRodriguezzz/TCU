import express from "express";
import {
  createClass,
  getClasses,
  getClassById,
  getClassByProf,
  updateClass,
  deleteClass,
  enrollStudent,
  removeStudent,
  updateAttendance,
  updateGrades,
  getStudentClasses
} from "../controllers/Professor/classControls.js";

const router = express.Router();

// CREATE a new class
router.post("/", createClass);

// GET all classes (with pagination, filters, search)
router.get("/", getClasses);

// GET a single class by ID
router.get("/:id", getClassById);
router.get("/prof/:professorId", getClassByProf);

// UPDATE a class section information
router.put("/:id", updateClass);
router.put("/attendance/:classId", updateAttendance);
router.put("/grades/:classId", updateGrades);
router.get("/student/:studentId", getStudentClasses);

// DELETE a class
router.delete("/:id", deleteClass);

// ENROLL a student to a class
router.post("/:id/enroll", enrollStudent);

// REMOVE a student from a class
router.post("/:id/remove-student", removeStudent);

export default router;
