import express from "express";
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  enrollStudent,
  removeStudent,
} from "../controllers/Professor/classControls.js";

const router = express.Router();

// CREATE a new class
router.post("/", createClass);

// GET all classes (with pagination, filters, search)
router.get("/", getClasses);

// GET a single class by ID
router.get("/:id", getClassById);

// UPDATE a class section information
router.put("/:id", updateClass);

// DELETE a class
router.delete("/:id", deleteClass);

// ENROLL a student to a class
router.post("/:id/enroll", enrollStudent);

// REMOVE a student from a class
router.post("/:id/remove-student", removeStudent);

export default router;
