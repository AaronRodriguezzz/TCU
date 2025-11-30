import express from "express";
import {
  createStudent,
  getStudents,
  getStudent,
  getUnenrolledStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/Student/studentControls.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.get("/unenrolled/:id", getUnenrolledStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
