import express from "express";
import {
  createProfessor,
  getProfessors,
  getProfessor,
  updateProfessor,
  deleteProfessor,
} from "../controllers/Admin/professorControls.js";

const router = express.Router();

router.post("/", createProfessor);
router.get("/", getProfessors);
router.get("/:id", getProfessor);
router.put("/:id", updateProfessor);
router.delete("/:id", deleteProfessor);

export default router;
