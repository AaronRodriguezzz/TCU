import express from "express";
import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../../controllers/Student/studentControls.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
